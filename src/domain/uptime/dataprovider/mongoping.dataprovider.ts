abstract class MongoPingDataProvider {
  abstract ping(): Promise<string>;
}

export { MongoPingDataProvider };
