export class HRLearnerInputDTO {
  learners: Array<HRLearner>;
}

export interface HRLearner {
  id: string;
  name: string;
}
