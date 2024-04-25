export interface Content {
  minutes?: number;
  content?: string;
  published?: boolean;
  day?: number;
}
export interface AvailableScheduleItem {
  time: number;
  schedule: Content[][];
}
// table header
export const tableHeadings: string[] = [
  "Time",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const formatTime = (value: number) => {
  if (value === 0) {
    return `Midnight`;
  } else if (value < 10) {
    return `${value}am`;
  } else if (value >= 10 && value < 12) {
    return `${value}am`;
  } else if (value === 12) {
    return `${value}noon`;
  } else {
    return `${value % 12}pm`;
  }
};

// table contents
export const availableSchedule: AvailableScheduleItem[] = [
  {
    time: 0,
    schedule: [[], [], [], [], [], [], []],
  },
  {
    time: 1,
    schedule: [[], [], [], [], [], [], []],
  },
  {
    time: 2,
    schedule: [[], [], [], [], [], [], []],
  },
  {
    time: 3,
    schedule: [[], [], [], [], [], [], []],
  },
  {
    time: 4,
    schedule: [[], [], [], [], [], [], []],
  },
  {
    time: 5,
    schedule: [[], [], [], [], [], [], []],
  },
  {
    time: 6,
    schedule: [[], [], [], [], [], [], []],
  },
  {
    time: 7,
    schedule: [[], [], [], [], [], [], []],
  },
  {
    time: 8,
    schedule: [[], [], [], [], [], [], []],
  },
  {
    time: 9,
    schedule: [[], [], [], [], [], [], []],
  },
  {
    time: 10,
    schedule: [[], [], [], [], [], [], []],
  },
  {
    time: 11,
    schedule: [[], [], [], [], [], [], []],
  },
  {
    time: 12,
    schedule: [[], [], [], [], [], [], []],
  },
  {
    time: 13,
    schedule: [[], [], [], [], [], [], []],
  },
  {
    time: 14,
    schedule: [[], [], [], [], [], [], []],
  },
  {
    time: 15,
    schedule: [[], [], [], [], [], [], []],
  },
  {
    time: 16,
    schedule: [[], [], [], [], [], [], []],
  },
  {
    time: 17,
    schedule: [[], [], [], [], [], [], []],
  },
  {
    time: 18,
    schedule: [[], [], [], [], [], [], []],
  },
  {
    time: 19,
    schedule: [[], [], [], [], [], [], []],
  },
  {
    time: 20,
    schedule: [[], [], [], [], [], [], []],
  },
  {
    time: 21,
    schedule: [[], [], [], [], [], [], []],
  },
  {
    time: 22,
    schedule: [[], [], [], [], [], [], []],
  },
  {
    time: 23,
    schedule: [[], [], [], [], [], [], []],
  },
];
