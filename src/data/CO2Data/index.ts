import type {SourceDataType} from "../../types";

let data: SourceDataType | null = null;
let promise: Promise<void> | null = null;

export const fetchCO2Data = (): SourceDataType => {
  if (data) return data;
  if (!promise) {
    promise = fetch('https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json')
      .then(response => response.json())
      .then(loadedData => {
        data = loadedData;
        promise = null;
      })
      .catch(error => {
        promise = null;
        throw error;
      });
  }
  throw promise;
};
