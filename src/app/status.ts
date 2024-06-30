export enum NonVolStatus {
  OK = 'OK',
  FNT = 'FNT',
  BRN = 'BRN',
  FRZ = 'FRZ',
  PAR = 'PAR',
  SLP = 'SLP',
  PSN = 'PSN',
  B_PSN = 'PSN',
}

export enum VolStatus {
    BOUND,
    CONFUSION,
    CURSE,
    DROWSY,
    EMBARGO,
    ENCORE,
    FLINCH,
    HEAL_BLOCK,
    IDENTIFIED,
    INFATUATION,
    LEECH_SEED,
    PERISH_SONG,
    TAUNT,
    TELEKINESIS,
    TORMENT,
    TYPE_CHANGE,
}

export enum SelfStatus {
    // TODO
}

export interface Status {
    nonVStatus: NonVolStatus,
    vStatus: VolStatus[],
    selfStatus: SelfStatus[],
}

export interface PassedStatus {
    nonVStatus: NonVolStatus | undefined,
    vStatus: VolStatus[] | undefined,
    selfStatus: SelfStatus[] | undefined,
}