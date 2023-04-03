abstract class UptimeUseCase {
  abstract ping(): Promise<string>;
}

export { UptimeUseCase };
