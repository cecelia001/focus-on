import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function AddDay(props) {
  const navigate = useNavigate();
  // Check if current day already exists in db
  // If true, disable button (can't add day twice)
  // If false, add new day is possible
  function checkDate() {
    let getDay = new Date();
    var dd = String(getDay.getDate()).padStart(2, "0");
    var mm = String(getDay.getMonth() + 1).padStart(2, "0");
    var yyyy = getDay.getFullYear();
    let today = dd + "." + mm + "." + yyyy;
    const found = props.overviewData.findIndex(function (element) {
      return element.date === today;
    });
    if (found === -1) {
      return false;
    } else {
      return true;
    }
  }

  async function insertDay() {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      let response = await fetch("/days", options);
      if (response.ok) {
        let newDay = await response.json();
        let dayId = newDay[0].id;
        navigate(`/focus/${dayId}`);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }

  return (
    <div>
      <h2>Hello</h2>
      {!checkDate() && <Button onClick={insertDay}>Add new day</Button>}
    </div>
  );
}

export default AddDay;
