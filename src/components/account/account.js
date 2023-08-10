import React, { useState, useEffect } from "react";

import { Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";
import dbData from "../../services/CardsMock.json"; // Import the JSON data
import Card from "../card/card";
function Account() {
  const [comptes, setComptes] = useState([]);
  const [selectedCompte, setSelectedCompte] = useState("");
  const [selectedCardNumber, setSelectedCardNumber] = useState("");
  const [selectedCardType, setSelectedCardType] = useState("");
  const [cards, setCards] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchedData = dbData.data;
    setData(fetchedData);
    setComptes([...new Set(fetchedData.map((item) => item.accountId))]);
  }, []);

  useEffect(() => {
    if (selectedCompte) {
      const filteredCards = data.filter(
        (item) => item.accountId === selectedCompte
      );
      setCards(filteredCards);
    } else {
      setCards([]);
    }
    setSelectedCardNumber("");
    setSelectedCardType("");
  }, [selectedCompte, data]);

  const cardNumbersForSelectedAccount = cards
    .filter((card) => card.accountId === selectedCompte)
    .map((card) => card.cardNumber);

  const cardTypesForSelectedAccount = cards
    .filter((card) => card.accountId === selectedCompte)
    .map((card) => card.type);







    const cardStatusForSelectedAccount = cards
    .filter((card) => card.cardNumber === selectedCardNumber)
    .map((card) => card);
console.log("cardForSelectedAccount",cardStatusForSelectedAccount);





  return (
    <><header>Mes cartes</header>
      <Box p={3}>
        
        <FormControl fullWidth variant="outlined">
          <InputLabel>Selectionner un compte</InputLabel>
          <Select
            value={selectedCompte}
            onChange={(e) => setSelectedCompte(e.target.value)}
            label="Select Compte"
          >
            <MenuItem value="">
              <em>Selectionner un compte</em>
            </MenuItem>
            {comptes.map((compte) => (
              <MenuItem key={compte} value={compte}>
                {compte}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {selectedCompte && (
          <div>
            <FormControl
              fullWidth
              variant="outlined"
              style={{ marginTop: "1rem" }}
            >
              <InputLabel >Selectionner un numéro de carte</InputLabel>
              <Select
                value={selectedCardNumber}
                onChange={(e) => setSelectedCardNumber(e.target.value)}
                label="Selectionner un numéro de carte"
              >
                <MenuItem value="">
                  <em>Selectionner un numéro de carte</em>
                </MenuItem>
                {cardNumbersForSelectedAccount.map((cardNumber) => (
                  <MenuItem key={cardNumber} value={cardNumber}>
                    {cardNumber}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              fullWidth
              variant="outlined"
              style={{ marginTop: "1rem" }}
            >
              <InputLabel>Selectionner un type de carte</InputLabel>
              <Select
                value={selectedCardType}
                onChange={(e) => setSelectedCardType(e.target.value)}
                label="Selectionner un type de carte"
              >
                <MenuItem value="">
                  <em>Selectionner un type de carte</em>
                </MenuItem>
                {cardTypesForSelectedAccount.map((cardType) => (
                  <MenuItem key={cardType} value={cardType}>
                    {cardType}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )}
      </Box>

      {selectedCardNumber && <Card cardStatusForSelectedAccount={cardStatusForSelectedAccount[0]} />


      }
    </>
  );
}

export default Account;
