import { Button, Modal } from "react-bootstrap";
import card from "../../assets/img/card.png";
import "./card.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Slider, Typography, IconButton } from "@mui/material";
import Switch from "@mui/material/Switch";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect } from "react";
function Card(props) {
  const [switchChecked, setSwitchChecked] = useState(false);
  useEffect(() => {
    if (props.cardStatusForSelectedAccount.status === 'En route') {
        setSwitchChecked(false)
    }else if (props.cardStatusForSelectedAccount.status === 'Bloquée'){setSwitchChecked(false)}
    else setSwitchChecked(true)
  }, [props.cardStatusForSelectedAccount.status]);
  const handleSwitchChange = () => {
console.log(props.cardStatusForSelectedAccount.status);   

    
  };

  const [showDialog, setShowDialog] = useState(false);
  const openDialog = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };
  function addSpacesEveryNChars() {
    const regex = new RegExp(`.{1,${4}}`, "g");
    const substring = props.cardStatusForSelectedAccount.cardNumber.slice(
      12,
      16
    );
    const substring2 = "············".concat(substring);

    return substring2.match(regex).join(" ");
  }
  function formatToMMYY(inputDate) {
    const parts = inputDate.split("/");
    if (parts.length !== 3) {
      return "Invalid date format";
    }
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      return "Invalid date format";
    }

    // Create a new Date object with the extracted values
    const dateObject = new Date(year, month - 1, day);

    // Use date-fns to format the date to MM/YY
    const formattedDate = dateObject.toLocaleDateString(undefined, {
      year: "2-digit",
      month: "2-digit",
    });

    return formattedDate;
  }

  const [cardLimit, setCardLimit] = useState(
    props.cardStatusForSelectedAccount.cardLimit
  );

  const [value, setValue] = useState(
    props.cardStatusForSelectedAccount.cardLimit
  );

  const handleChange = (event, newValue) => {
    console.log(value);
    if (typeof newValue === "number") {
      setValue(newValue);
    }

  };

  const validateUpdates = () => {
    setCardLimit(value);
    closeDialog(true);
  };


  
  return (
    <>
      <center>
        <div className="img-container">
          <img src={card} alt="card" />
          <div className="img-text1">{addSpacesEveryNChars()}</div>
          <div className="img-text2">
            {props.cardStatusForSelectedAccount.accountName}
          </div>
          <div className="img-text4">Date d'expiration</div>
          <div className="img-text3">
            {formatToMMYY(props.cardStatusForSelectedAccount.expiryDate)}
          </div>
        </div>

        <Modal
          size={"l"}
          show={showDialog}
          onHide={closeDialog}
          centered={true}
        >
          <Modal.Header closeButton>
            <Modal.Title>{"Augmentation du plafond de la carte"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Typography id="non-linear-slider" gutterBottom></Typography>
            <Slider
              value={value}
              min={400}
              sx={{ width: "100%", color: "#FC6A03" }}
              max={10000}
              onChange={handleChange}
              valueLabelDisplay="auto"
              aria-labelledby="modal-slider"
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography> 400</Typography>

              <Typography style={{ float: "right" }}>
                {" "}
                {props.cardStatusForSelectedAccount.cardAvailableLimit}
              </Typography>
            </div>

            <Typography>Value: {value}</Typography>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={validateUpdates}  color= "#FC6A03" >
              Valider les modifications
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="tab">
          <Switch
            checked={switchChecked}
            onChange={handleSwitchChange}
            color="success" // Use "primary" color for the switch
            value="dynamic-class-name"
          />
          <table className="table">
            <tbody>
              <tr>
                <td className="key">Statut</td>

                <td className="value">
                  {props.cardStatusForSelectedAccount.status}
                </td>
              </tr>
              <tr>
                <td className="key">Date d'expiration</td>

                <td className="value">
                  {props.cardStatusForSelectedAccount.expiryDate}
                </td>
              </tr>
              <tr>
                <td className="key">Plafond disponible</td>

                <td className="value">
                  {props.cardStatusForSelectedAccount.cardAvailableLimit}
                </td>
              </tr>
              <tr>
                <td className="key">Plafond hebdomadaire</td>

                <td className="value">
                  <IconButton
                    onClick={openDialog}
                    aria-label="edit"
                    sx={{ color: "#FC6A03"}}
                  >
                    <EditIcon />
                  </IconButton>
                  {cardLimit}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </center>
    </>
  );
}

export default Card;
