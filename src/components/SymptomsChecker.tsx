import { useState } from "react";
import { checkSymptoms, getConditionInfo, saveSearchHistory } from "../api/symptomsService";
import SymptomsInput from "./SymptomsInput";
import ConditionsList from "./ConditionsList";
import ConditionDetails from "./ConditionDetails";
import ConditionInput from "./ConditionInput";

const SymptomsChecker = () => {
  const [conditions, setConditions] = useState<string | null>(null);
  const [selectedCondition, setSelectedCondition] = useState("");
  const [conditionDetails, setConditionDetails] = useState<string | null>(null);

  const handleCheckSymptoms = async (symptoms: string) => {
    try {
      const fetchedConditions = await checkSymptoms(symptoms);
      setConditions(fetchedConditions);
      await saveSearchHistory(symptoms, fetchedConditions);
    } catch (error) {
      console.error("Error checking symptoms:", error);
    }
  };

  const handleGetConditionInfo = async () => {
    if(!selectedCondition.trim()) {
      alert("Please enter a condition before getting details.");
      return;
    }
    try {
      let details = await getConditionInfo(selectedCondition);
      if (details.startsWith("Sure!")) {
        details = details.substring(5).trim();
      }
      setConditionDetails(details);
    } catch (error) {
      console.error("Error getting condition details:", error);
    }
  };

  return (
    <main>
      <SymptomsInput onCheckSymptoms={handleCheckSymptoms} />
      <ConditionsList conditions={conditions} />
      <ConditionInput onSelectCondition={setSelectedCondition} onGetConditionInfo={handleGetConditionInfo} />
      <ConditionDetails details={conditionDetails} />
    </main>
  );
};

export default SymptomsChecker;
