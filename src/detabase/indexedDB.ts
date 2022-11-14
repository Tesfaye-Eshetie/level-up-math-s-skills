import { openDB } from "idb";

type dataProps = {
  id: string;
  equation: string;
  answer: number | undefined;
  rightAnswer: number;
};

export const database = openDB("MathsDB", 1, {
  upgrade(db) {
    db.createObjectStore("results");
  },
});

export const addResults = async (key: string, data: dataProps) =>
  (await database).put("results", data, key);
