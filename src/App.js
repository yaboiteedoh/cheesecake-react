import { CategoryConstructor } from "./CategoryConstructor";
import { CategoryList } from "./CategoryList";
import { ModifierConstructor } from "./ModifierConstructor";
import { ModifierList } from "./ModifierList";
import { useState } from "react";
import * as f from "./frontendLogic"


const App = () => {
  // states
  const [mods, setMods] = useState([]);
  const [cats, setCats] = useState([]);
  const [links, setLinks] = useState([]);

  // creates a new modifier backend object and stores it to the state
  // returns a copy of that object, for easier access to attributes
  function new_mod(m_title, m_operator, m_value) {
    const mod = {
      // primary key
      id: "m" + randomID(),
      // user input
      title: m_title,
      // currently + or -
      operator: m_operator,
      // user input
      value: Number(m_value),
      // for html
      text: m_title + " " + m_operator + m_value,
      // user has this element selected
      selected: false,
    };
    // add to relevant state
    setMods((prevMods) => [...prevMods, mod]);
    // for attribute data
    return mod;
  }
  // creates a new category backend object and stores it to the state
  // returns a copy of that object, for easier access to attributes
  function new_cat(c_title, c_value) {
    let cat = {
      // primary key
      id: "c" + randomID(),
      // user input
      title: c_title,
      // user input
      value: Number(c_value),
      // for html
      text: c_title + " " + c_value,
      // user has this element selected
      selected: false,
    };
    // add to relevant state
    setCats((prevCats) => [...prevCats, cat]);

    // for attribute data
    return cat;
  }
  // creates a new link object and stores it to the state
  // returns a copy of that object, for easier access to attributes
  function new_link(m_id, c_id) {
    var link = {
      // primary key
      id: "l" + randomID(),
      // modifier to originate from
      m_id: m_id,
      // category to act on
      c_id: c_id,
      // state management boolean
      active: false,
    };
    // add to relevant state
    setLinks((prevLinks) => [...prevLinks, link]);
    // for attribute data
    return link;
  }
  // generates links via all selected modifiers/categories
  function generate_links() {
    const mods = mS$();
    const cats = cS$();
    mods.forEach((mod) => {
      mod.selected = !mod.selected;
      f.e$('#' + mod.id).parentElement.style.background = 'rgb(44, 0, 0)';
      cats.forEach((cat) => {
        cat.selected = !cat.selected;
        f.e$('#' + cat.id).parentElement.style.background = 'rgb(44, 28, 0)';
        if(!lS$(mod.id, cat.id)){
          new_link(mod.id, cat.id);
        }
      });
    });
  }

  // query for link objects [] via modifier id
  function l$(m_id) {
    var link = links.filter((link) => link.m_id === m_id);
    return link;
  }
  // query for category object via category id
  function c$(c_id) {
    let cat = cats.find((cat) => cat.id === c_id);
    return cat;
  }
  // query for modifier object via modifier id
  function m$(m_id) {
    let mod = mods.find((mod) => mod.id === m_id);
    return mod;
  }
  // query for modifier objects [] via selected status
  function mS$() {
    let mod = mods.filter((mod) => mod.selected === true);
    return mod;
  }
  // query for category objects [] via selected status
  function cS$() {
    let cat = cats.filter((cat) => cat.selected === true);
    return cat;
  }
  // query for link object via mod and cat ids
  function lS$(m_id, c_id){
    let link = cats.find((link) => link.m_id === m_id && link.c_id === c_id);
    return link;
  }

  // activates all current links originating from a modifier by id
  function activate(m_id) {
    // easy reference relevant links
    var links_array = []
    l$(m_id).forEach((link) => {
      var new_link = link;
      links_array.push(new_link)
    });

    links_array.forEach((link) => {
      // read/write
      var new_cat = c$(link.c_id);
      // read only
      var this_mod = m$(link.m_id);
      // remove the outdated object
      setCats((prevCats) => prevCats.filter((cat) => cat.id !== new_cat.id))

      // if + then +
      if (this_mod.operator === "+") {
        new_cat.value += this_mod.value;
        // adjust innerText with current data
        new_cat.text = new_cat.title + " " + new_cat.value;
      // if - then -
      } else if (this_mod.operator === "-") {
        new_cat.value -= this_mod.value;
        // adjust innerText with current data
        new_cat.text = new_cat.title + " " + new_cat.value;
      }

      // add the updated object
      setCats((prevCats) => [...prevCats, new_cat]);
    });
  }
  // reverses activation
  // same code but with reversed operators
  function deactivate(m_id) {
    var links_array = []
    l$(m_id).forEach((link) => {
      var new_link = link;
      links_array.push(new_link)
    });
    links_array.forEach((link) => {
      var new_cat;
      var this_mod = m$(link.m_id);
      new_cat = c$(link.c_id);
      setCats((prevCats) => prevCats.filter((cat) => cat.id !== new_cat.id))
      if (this_mod.operator === "+") {
        new_cat.value -= this_mod.value;
        new_cat.text = new_cat.title + " " + new_cat.value;
      } else if (this_mod.operator === "-") {
        new_cat.value += this_mod.value;
        new_cat.text = new_cat.title + " " + new_cat.value;
      }
      setCats((prevCats) => [...prevCats, new_cat]);
    });
  }

  // state functions
  function filterCats(new_cat) {
    let i = cats.indexOf(c$(new_cat.id));
    const new_cats = cats.filter(cat => 
      cat.id !== new_cat.id);
    setCats(new_cats);

    return i;
  }
  function updateCats(new_cat, i) {
    let insert = i;
    const next_cats = [
      ...cats.slice(0, insert),
      new_cat,
      ...cats.slice(insert+1)
    ];
    setCats(next_cats);
  }
  function filterMods(new_mod) {
    let i = mods.indexOf(m$(new_mod.id));
    const new_mods = mods.filter(mod => 
      mod.id !== new_mod.id);
    setMods(new_mods);

    return i;
  }
  function updateMods(new_mod, i) {
    let insert = i;
    const next_mods = [
      ...mods.slice(0, insert),
      new_mod,
      ...mods.slice(insert+1)
    ];
    setMods(next_mods);
  }

  function randomID(){
    return Math.floor(Math.random() * Date.now())
  }

  return (
    <div className="App">
      <ModifierConstructor new_mod={new_mod} />
      <CategoryConstructor new_cat={new_cat} />
      <CategoryList 
        cats={cats} 
        c$={c$}
        updateCats={updateCats}
        filterCats={filterCats} />
      <ModifierList
        mods={mods}
        m$={m$}
        activate={activate}
        deactivate={deactivate}
        updateMods={updateMods}
        filterMods={filterMods}
      />
      <button onClick={generate_links}>LINK</button>
    </div>
  );
};

export default App;
