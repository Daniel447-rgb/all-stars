export const INITIAL_FORMATIONS = {
  '4-3-3': {
    GK: { top: '88%', left: '50%', label: 'Goalkeeper' },
    LB: { top: '70%', left: '15%', label: 'Left Back' },
    CB1: { top: '74%', left: '38%', label: 'Centre Back' },
    CB2: { top: '74%', left: '62%', label: 'Centre Back' },
    RB: { top: '70%', left: '85%', label: 'Right Back' },
    CDM: { top: '53%', left: '50%', label: 'Defensive Mid' },
    CM: { top: '43%', left: '26%', label: 'Central Mid' },
    CAM: { top: '38%', left: '74%', label: 'Attacking Mid' },
    LW: { top: '18%', left: '16%', label: 'Left Wing' },
    ST: { top: '14%', left: '50%', label: 'Striker' },
    RW: { top: '18%', left: '84%', label: 'Right Wing' }
  },
  '4-4-2': {
    GK: { top: '88%', left: '50%', label: 'Goalkeeper' },
    LB: { top: '72%', left: '15%', label: 'Left Back' },
    CB1: { top: '75%', left: '38%', label: 'Centre Back' },
    CB2: { top: '75%', left: '62%', label: 'Centre Back' },
    RB: { top: '72%', left: '85%', label: 'Right Back' },
    LW: { top: '48%', left: '15%', label: 'Left Mid' },
    CDM: { top: '52%', left: '38%', label: 'Central Mid' },
    CM: { top: '52%', left: '62%', label: 'Central Mid' },
    RW: { top: '48%', left: '85%', label: 'Right Mid' },
    CAM: { top: '18%', left: '36%', label: 'Centre Forward' },
    ST: { top: '18%', left: '64%', label: 'Striker' }
  },
  '3-5-2': {
    GK: { top: '88%', left: '50%', label: 'Goalkeeper' },
    CB1: { top: '74%', left: '25%', label: 'Left Centre Back' },
    CB2: { top: '77%', left: '50%', label: 'Centre Back' },
    RB: { top: '74%', left: '75%', label: 'Right Centre Back' },
    LB: { top: '48%', left: '12%', label: 'Left Wing-Back' },
    CDM: { top: '55%', left: '38%', label: 'Defensive Mid' },
    CM: { top: '55%', left: '62%', label: 'Central Mid' },
    CAM: { top: '38%', left: '50%', label: 'Attacking Mid' },
    RW: { top: '48%', left: '88%', label: 'Right Wing-Back' },
    LW: { top: '16%', left: '35%', label: 'Striker' },
    ST: { top: '16%', left: '65%', label: 'Striker' }
  }
};

const DEFENDER_SLOTS = ['LB', 'CB1', 'CB2', 'RB'];
const MIDFIELD_SLOTS = ['CDM', 'CM', 'CAM', 'LW', 'RW', ...DEFENDER_SLOTS, 'ST'];
const FORWARD_SLOTS = ['ST', 'LW', 'RW', 'CAM', 'CM', 'CDM', ...DEFENDER_SLOTS];

export const createFormationLayout = (name) => {
  const lines = name.split('-').map(Number);
  if (
    lines.length < 2 ||
    lines.length > 4 ||
    lines.some(count => !Number.isInteger(count) || count < 1 || count > 5) ||
    lines.reduce((total, count) => total + count, 0) !== 10
  ) {
    return null;
  }

  const slots = {
    GK: { top: '88%', left: '50%', label: 'Goalkeeper' }
  };
  const usedSlots = new Set(['GK']);
  const lineCount = lines.length;

  lines.forEach((count, lineIndex) => {
    const preferredSlots = lineIndex === 0
      ? DEFENDER_SLOTS
      : lineIndex === lineCount - 1
        ? FORWARD_SLOTS
        : MIDFIELD_SLOTS;
    const availableSlots = [
      ...preferredSlots,
      ...MIDFIELD_SLOTS,
      ...FORWARD_SLOTS,
      ...DEFENDER_SLOTS
    ].filter((slot, index, slotsList) =>
      !usedSlots.has(slot) && slotsList.indexOf(slot) === index
    );
    const top = 76 - (58 * lineIndex) / (lineCount - 1);

    for (let index = 0; index < count; index += 1) {
      const slot = availableSlots[index];
      usedSlots.add(slot);
      slots[slot] = {
        top: `${top}%`,
        left: `${count === 1 ? 50 : 15 + (70 * index) / (count - 1)}%`,
        label: `Line ${lineIndex + 1}`
      };
    }
  });

  return slots;
};
