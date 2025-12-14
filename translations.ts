import { Language } from './types';

export const TRANSLATIONS = {
  en: {
    ready: "Ready to Spin!",
    gameOver: "Game Over! No credits left.",
    winner: "WINNER!",
    noWin: "No win. Try again.",
    spinning: "SPINNING...",
    spin: "SPIN",
    reset: "RESET GAME",
    bankroll: "Bankroll",
    win: "Win",
    credits: "CR",
    payTable: "Pay Table",
    paylineCenter: "1 Credit per Spin • Payline Center",
    
    // Instructions
    instructionsTitle: "How to Play",
    objectiveTitle: "Objective",
    objectiveTextPart1: "Match 3 symbols on the ",
    objectiveTextPart2: "center red payline",
    objectiveTextPart3: " to win.",
    costTitle: "Cost",
    costText: "1 Credit / Spin",
    controlsTitle: "Controls",
    controlsText: "[S] or SPACE",
    payoutsTitle: "Payouts",
    anyCherry: "Any Cherry counts for small wins!",
    simulationDisclaimer: "This is a simulation for entertainment only. The game does not allow any real winnings.",
    privacyDisclaimer: "Uses your Google AI Studio account. No data is collected.",
    playButton: "PLAY",
    howToPlayTooltip: "How to Play",
    pressToSpinPart1: "Press ",
    pressToSpinPart2: " or ",
    pressToSpinPart3: " to Spin",
    authenticSim: "Authentic 3-Reel Simulation",
    
    // Donation
    donate: "Donate",
    
    // Symbol labels
    labelCherry: "Cherry",
    labelBell: "Bell",
    
    // Win messages (Keys from utils)
    JACKPOT_7: "JACKPOT! 3 x 7",
    BIG_WIN_BAR: "BIG WIN! 3 x BAR",
    WIN_BELL: "WIN! 3 x BELL",
    WIN_CHERRY: "WIN! 3 x CHERRY",
    WIN_2_CHERRY: "2 x CHERRY",
    WIN_1_CHERRY: "1 x CHERRY",
    
    // Paytable rows
    any: "(Any)",
  },
  it: {
    ready: "Pronto a girare!",
    gameOver: "Game Over! Crediti esauriti.",
    winner: "VITTORIA!",
    noWin: "Nessuna vincita. Riprova.",
    spinning: "GIRANDO...",
    spin: "GIRA",
    reset: "RESETTA",
    bankroll: "Saldo",
    win: "Vincita",
    credits: "CR",
    payTable: "Tabella Pagamenti",
    paylineCenter: "1 Credito per Giro • Linea Centrale",
    
    // Instructions
    instructionsTitle: "Come Giocare",
    objectiveTitle: "Obiettivo",
    objectiveTextPart1: "Allinea 3 simboli sulla ",
    objectiveTextPart2: "linea rossa centrale",
    objectiveTextPart3: " per vincere.",
    costTitle: "Costo",
    costText: "1 Credito / Giro",
    controlsTitle: "Comandi",
    controlsText: "[S] o SPAZIO",
    payoutsTitle: "Pagamenti",
    anyCherry: "Qualsiasi Ciliegia paga!",
    simulationDisclaimer: "Questa è una simulazione a scopo di intrattenimento. Il gioco non consente vincite reali.",
    privacyDisclaimer: "Utilizza il tuo account Google AI Studio. Nessun dato viene raccolto.",
    playButton: "GIOCA",
    howToPlayTooltip: "Istruzioni",
    pressToSpinPart1: "Premi ",
    pressToSpinPart2: " o ",
    pressToSpinPart3: " per Girare",
    authenticSim: "Simulazione Autentica a 3 Rulli",

    // Donation
    donate: "Dona",

    // Symbol labels
    labelCherry: "Ciliegia",
    labelBell: "Campana",

    // Win messages
    JACKPOT_7: "JACKPOT! 3 x 7",
    BIG_WIN_BAR: "GRANDE VINCITA! 3 x BAR",
    WIN_BELL: "VITTORIA! 3 x CAMPANA",
    WIN_CHERRY: "VITTORIA! 3 x CILIEGIA",
    WIN_2_CHERRY: "2 x CILIEGIA",
    WIN_1_CHERRY: "1 x CILIEGIA",

    // Paytable rows
    any: "(Qualsiasi)",
  }
};

export const getTranslation = (lang: Language) => TRANSLATIONS[lang];