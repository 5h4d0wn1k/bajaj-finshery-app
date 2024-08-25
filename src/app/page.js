"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Select from "react-select"; // Assuming you're using react-select

export default function Component() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedFields, setSelectedFields] = useState([]);

  const handleJsonInput = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("YOUR_API_URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonInput,
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFieldSelect = (selectedOptions) => {
    setSelectedFields(selectedOptions.map((option) => option.value));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle>JSON Data Processor</CardTitle>
          <CardDescription>
            Input JSON data and see the response from the backend.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              value={jsonInput}
              onChange={handleJsonInput}
              placeholder="Enter JSON data"
              className="h-32 resize-none"
              required
            />
            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
        {response && (
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="fields">Select Fields</Label>
                <Select
                  id="fields"
                  isMulti
                  options={Object.keys(response).map((key) => ({
                    value: key,
                    label: key,
                  }))}
                  onChange={handleFieldSelect}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>
              <div>
                <Label htmlFor="response">Response</Label>
                <Textarea
                  id="response"
                  value={JSON.stringify(
                    selectedFields.length
                      ? selectedFields.reduce((obj, key) => {
                          obj[key] = response[key];
                          return obj;
                        }, {})
                      : response,
                    null,
                    2
                  )}
                  className="h-32 resize-none"
                  readOnly
                />
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </main>
  );
}
