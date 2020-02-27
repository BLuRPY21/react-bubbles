import React, { useState } from "react";

import axiosWithAuth from "../axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  // const [colorToAdd, setColorToAdd] = useState(initialColor);

  // let copy = [...colors]

  const editColor = colors => {
    setEditing(true);
    setColorToEdit(colors);
    // setColorToAdd(color);
  };

  // const saveEdit = e => {
  //   e.preventDefault();
  //   axiosWithAuth()
  //     .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
  //     .then(res => {
  //       updateColors(copy.map(element => {
  //         if (element.id === res.data.id){
  //           console.log('OhYeah')
  //           return res.data
  //           //element = colorToEdit
  //         } else {
  //           console.log('Error')
  //           return element
  //         }
  //       }))
  //     })
  // };



  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        updateColors([
          ...colors.filter(color => color.id !== colorToEdit.id),
          res.data
        ])
         
          setEditing(false);
          setColorToEdit(initialColor);
      })
    };
        // .catch(error => console.log(error));
  

  // const addColor = e => {
  //   e.preventDefault();
  //   axiosWithAuth() 
  //   .put(`/colors/${colorToAdd.id}`, colorToAdd)
  //   .then(response => {
  //     updateColors([
  //       ...colors.filter(color => color.id !== colorToAdd.id),
  //       response.data,
  //     ])
  //   })
  // }

  const deleteColor = colorToDelete => {
    axiosWithAuth()
      .delete(`/colors/${colorToDelete.id}`)
      .then(() => {
        updateColors(colors.filter(color => color.id !== colorToDelete.id));
      })
      .catch(error => console.log(error));
    
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            {/* <button type="addColor">add color</button> */}
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* <form onSubmit={addColor}> */}
        {/* <legend>add color</legend>
        <label>
          color name: */}
          {/* <input 
          onChange={e => 
          setColorToAdd({...colorToAdd, color: e.target.value})
        }
        value={colorToAdd.color}
        /> */}
        {/* </label>
      </form> */}
      {/* stretch - build another form here to add a color */}
    </div>
  );
    };

export default ColorList;

// axiosWithAuth()
//         .get("/colors")
      
//       .then(response => { 
//         console.log(response);
//         updateColors(response.data)
//       })
//       .catch(error => console.log(error));
