// DV Survivor Traffic Stop Simulation Flow

const simulation = {
    title: "DV Survivor Traffic Stop",
    time: "3:34 AM",
    location: "Vale Rd @ Lytton Casino (North Exit)",
    characters: {
      survivor: {
        identity: "Black/Latina woman, age 32",
        context: "Left DV incident, on probation, not registered on vehicle",
        riskFactors: ["trauma", "probation violation", "racial profile"]
      },
      officers: [
        { name: "Officer White", identity: "White Female", demeanor: "aggressive", behavior: "bad cop" },
        { name: "Officer Cruz", identity: "Latino Male", demeanor: "dismissive", behavior: "good cop" }
      ]
    },
    sequence: [
      {
        id: "start",
        text: `You're driving away after defending yourself from your boyfriend. You turn onto Vale Rd. Suddenly, police lights flash behind you.`,
        choices: [
          { text: "Pull over and stay quiet", next: "copApproach" },
          { text: "Call 911 and narrate the stop", next: "dispatcher" },
          { text: "Turn on camera (SCENE App)", next: "recording" }
        ]
      },
      {
        id: "dispatcher",
        text: `911 answers. You explain the situation. They say, “Officers are already on scene. Stay calm.”`,
        choices: [{ text: "Hang up and wait", next: "copApproach" }]
      },
      {
        id: "recording",
        text: `SCENE app starts recording. Temperature: elevated. Heart rate: elevated. Microphone and video active.`,
        choices: [{ text: "Set to livestream to loved one", next: "copApproach" }]
      },
      {
        id: "copApproach",
        text: `Officer White bangs flashlight on your window: “License and registration!” Officer Cruz flanks passenger side.`,
        choices: [
          { text: "Say: I don’t feel safe, may I speak to a supervisor?", next: "escalate" },
          { text: "Say: I am on probation, but not doing anything wrong", next: "probationFlag" },
          { text: "Say nothing. Keep hands visible.", next: "tension" }
        ]
      },
      {
        id: "probationFlag",
        text: `Officer Cruz radios in your name. “Missed multiple check-ins. Might be a 3056 hold.”`,
        choices: [
          { text: "Explain DV incident", next: "explainer" },
          { text: "Ask if you're under arrest", next: "tension" }
        ]
      },
      {
        id: "explainer",
        text: `You tell them: “I was escaping a domestic violence situation. I’ve tried to get help.” Officer White smirks.`,
        choices: [
          { text: "Say: Please don’t retraumatize me.", next: "deescalation" },
          { text: "Stay silent", next: "escalation" }
        ]
      },
      {
        id: "tension",
        text: `The officers speak over you. Officer White unclips her taser. “You’re making this difficult.”`,
        choices: [
          { text: "Repeat: I don’t consent to a search", next: "outcome1" },
          { text: "Comply and step out", next: "outcome2" }
        ]
      },
      {
        id: "escalation",
        text: `You are pulled from the car, handcuffed on the curb. One officer whispers: “We’ll sort this out at the station.”`,
        outcome: "Simulation ends. You were retraumatized, not protected."
      },
      {
        id: "deescalation",
        text: `Officer Cruz pauses. “We’ll call your probation officer in the morning. Go home.”`,
        outcome: "Simulation ends. You deescalated—but only barely."
      },
      {
        id: "outcome1",
        text: `You are arrested for probation violation, but your SCENE footage is saved and sent to allies.`,
        outcome: "Simulation ends. Your voice was recorded."
      },
      {
        id: "outcome2",
        text: `You comply, but later file a complaint through SCENE. The footage triggers an internal review.`,
        outcome: "Simulation ends. Data logged. Eyes opened."
      }
    ]
  };
  
  // Optional starter function to run the sim
  function runSimulation() {
    let current = simulation.sequence.find(scene => scene.id === "start");
    console.log(`🕒 ${simulation.time} — 🚓 ${simulation.title}`);
    console.log(`📍 ${simulation.location}`);
    while (current) {
      console.log(`\n🗣️ ${current.text}`);
      if (current.choices) {
        current.choices.forEach((c, i) => console.log(`   ${i + 1}. ${c.text}`));
        // In live app, wait for user input here
        break; // For now, stop after first screen
      } else if (current.outcome) {
        console.log(`\n🔚 Outcome: ${current.outcome}`);
        break;
      }
    }
  }
  
  runSimulation();
  