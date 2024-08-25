// src/components/Component.js
"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function Component() {
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
          <h1 className="text-2xl font-bold mb-4">JSON Data Processor - 123456</h1>
          <div className="mb-4">
            <label htmlFor="json-input" className="block text-muted-foreground mb-2">
              Enter JSON Data:
            </label>
            <textarea
              id="json-input"
              className="w-full border border-input rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-primary"
              rows={4}
              value={jsonInput}
              onChange={handleJsonInput}
            />
            {jsonError && <p className="text-red-500 mt-2">{jsonError}</p>}
          </div>
          <button
            className="bg-primary text-primary-foreground rounded-md px-4 py-2 hover:bg-primary/90 transition-colors"
            onClick={handleJsonSubmit}
          >
            Process Data
          </button>
          {processedData.data && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Processed Data</h2>
                <div>
                  <label className="mr-2 text-muted-foreground">Filter by:</label>
                  <div className="inline-flex items-center gap-2">
                    <Checkbox
                      id="alphabets"
                      checked={selectedOptions.includes("alphabets")}
                      onCheckedChange={() => handleOptionChange("alphabets")}
                    />
                    <Label htmlFor="alphabets">Alphabets</Label>
                    <Checkbox
                      id="numbers"
                      checked={selectedOptions.includes("numbers")}
                      onCheckedChange={() => handleOptionChange("numbers")}
                    />
                    <Label htmlFor="numbers">Numbers</Label>
                    <Checkbox
                      id="highestLowercase"
                      checked={selectedOptions.includes("highestLowercase")}
                      onCheckedChange={() => handleOptionChange("highestLowercase")}
                    />
                    <Label htmlFor="highestLowercase">Highest Lowercase</Label>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-lg shadow-lg p-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-muted">
                      <th className="text-left pb-2">Key</th>
                      <th className="text-left pb-2">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item, index) => (
                      <tr key={index} className="border-b border-muted">
                        <td className="py-2 font-medium">{Object.keys(item)[0]}</td>
                        <td className="py-2">{item[Object.keys(item)[0]]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
