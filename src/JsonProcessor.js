import { useState } from "react";
import { Checkbox } from "./components/ui/checkbox";  // Adjust path as needed
import { Label } from "./components/ui/label";        // Adjust path as needed

export default function JsonProcessor() {
  const [jsonInput, setJsonInput] = useState("");
  const [jsonError, setJsonError] = useState("");
  const [processedData, setProcessedData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleJsonInput = (e) => {
    setJsonInput(e.target.value);
    setJsonError("");
  };

  const handleJsonSubmit = async () => {
    try {
      const data = JSON.parse(jsonInput);
      const response = await fetch("YOUR_API_URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const processedData = await response.json();
      setProcessedData(processedData);
      setSelectedOptions(["alphabets", "numbers", "highestLowercase"]);
    } catch (error) {
      setJsonError("Invalid JSON format");
    }
  };

  const handleOptionChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const filteredData = processedData.data?.filter((item) => {
    const keys = Object.keys(item);
    return selectedOptions.every((option) => {
      if (option === "alphabets") {
        return keys.every((key) => /^[a-zA-Z]+$/.test(key));
      }
      if (option === "numbers") {
        return keys.every((key) => /^[0-9]+$/.test(key));
      }
      if (option === "highestLowercase") {
        return keys.every((key) => key === key.toUpperCase().slice(0, 1) + key.slice(1).toLowerCase());
      }
      return true;
    });
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="max-w-xl w-full px-4 md:px-0">
        <div className="bg-card rounded-lg shadow-lg p-6">
          <h1 className="text-2
