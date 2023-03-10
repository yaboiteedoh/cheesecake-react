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
      id: "m" + (mods.length + 1),
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
      id: "c" + (cats.length + 1),
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
      id: "l" + (links.length + 1),
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
    // query for link object via modifier id
    // iterate for each link object in query array
    l$(m_id).forEach((link) => {
      // query for modifier object via modifier id (from link object)
      // modifier.operator logic
      if (m$(link.m_id).operator === "+") {
        // query for category object via category id (via link object)
        // change the category value
        c$(link.c_id).value += m$(link.m_id).value;
        // update the text value
        c$(link.c_id).text = c$(link.c_id).title + ": " + c$(link.c_id).value;
        // update the element
        f.e$('#' + link.c_id).innerText = c$(link.c_id).text
        // modifier.operator logic
      } else if (m$(link.m_id).operator === "-") {
        // change the category value
        c$(link.c_id).value -= m$(link.m_id).value;
        // update the text for html
        c$(link.c_id).text = c$(link.c_id).title + ": " + c$(link.c_id).value;
        // update the element
        f.e$('#' + link.c_id).innerText = c$(link.c_id).text
      }
    });
    console.log(links)
    console.log(mods)
    console.log(cats)
  }
  // reverses activation
  // same code but with reversed operators and boolean values
  function deactivate(m_id) {
    l$(m_id).forEach((link) => {
      m$(link.m_id).active = false;
      if (m$(link.m_id).operator === "+") {
        c$(link.c_id).value -= m$(link.m_id).value;
        c$(link.c_id).text = c$(link.c_id).title + ": " + c$(link.c_id).value;
        f.e$('#' + link.c_id).innerText = c$(link.c_id).text
      } else if (m$(link.m_id).operator === "-") {
        c$(link.c_id).value += m$(link.m_id).value;
        f.e$('#' + link.c_id).innerText = c$(link.c_id).text
      }
    });
  }

  return (
    <div className="App">
      <ModifierConstructor new_mod={new_mod} />
      <CategoryConstructor new_cat={new_cat} />
      <CategoryList cats={cats} c$={c$} />
      <ModifierList
        mods={mods}
        m$={m$}
        activate={activate}
        deactivate={deactivate}
      />
      <button onClick={generate_links}>LINK</button>
    </div>
  );
};

export default App;
