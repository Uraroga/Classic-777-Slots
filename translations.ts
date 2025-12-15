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
    paylineCenter: "10 Credits per Spin • Payline Center",
    
    // Stats
    totalSpins: "Total Spins",
    totalWins: "Total Wins",
    creditRatio: "Credit Ratio",
    
    // Win/Return Messages
    returnMsg: "CREDIT RETURN",

    // Instructions
    instructionsTitle: "How to Play",
    objectiveTitle: "Objective",
    objectiveTextPart1: "Match 3 symbols on the ",
    objectiveTextPart2: "center red payline",
    objectiveTextPart3: " to win.",
    costTitle: "Cost",
    costText: "10 Credits / Spin",
    controlsTitle: "Controls",
    controlsText: "[S] or SPACE",
    payoutsTitle: "Payouts",
    anyCherry: "1 or 2 Bells/Cherries return credits!",
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
    RETURN_2_BELL: "RETURN: 5 CR",
    RETURN_1_BELL: "RETURN: 2 CR",
    RETURN_2_CHERRY: "RETURN: 5 CR",
    RETURN_1_CHERRY: "RETURN: 2 CR",
    RETURN_MIXED: "MIXED RETURN",
    
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
    paylineCenter: "10 Crediti per Giro • Linea Centrale",
    
    // Stats
    totalSpins: "Giri Totali",
    totalWins: "Vincite Totali",
    creditRatio: "Rapporto Crediti",

    // Win/Return Messages
    returnMsg: "RITORNO CREDITI",

    // Instructions
    instructionsTitle: "Come Giocare",
    objectiveTitle: "Obiettivo",
    objectiveTextPart1: "Allinea 3 simboli sulla ",
    objectiveTextPart2: "linea rossa centrale",
    objectiveTextPart3: " per vincere.",
    costTitle: "Costo",
    costText: "10 Crediti / Giro",
    controlsTitle: "Comandi",
    controlsText: "[S] o SPAZIO",
    payoutsTitle: "Pagamenti",
    anyCherry: "1 o 2 Campane/Ciliegie restituiscono crediti!",
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
    RETURN_2_BELL: "RITORNO: 5 CR",
    RETURN_1_BELL: "RITORNO: 2 CR",
    RETURN_2_CHERRY: "RITORNO: 5 CR",
    RETURN_1_CHERRY: "RITORNO: 2 CR",
    RETURN_MIXED: "RITORNO MISTO",

    // Paytable rows
    any: "(Qualsiasi)",
  }
};

export const getTranslation = (lang: Language) => TRANSLATIONS[lang];