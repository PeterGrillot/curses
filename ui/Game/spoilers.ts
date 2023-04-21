export const Items = {
  Shard: "Shard",
  ShardPlus: "+Shard",
  Wire: "Wire",
  WirePlus: "+Wire",
  Energy: "Energy",
  Noodles: "Noodles",
  Whiskey: "Whiskey",
  Dagger: "Dagger",
  Pin: "Pin",
} as const;

export const Commands = {
  Continue: "Continue",
  Dodge: "Dodge",
  Restart: "Restart",
  Start: "Start",
  Back: "Back",
  LookAround: "LookAround",
  Search: "Search",
  Talk: "Talk",
  Leave: "Leave",
  Accept: "Accept",
  Decline: "Decline",
  Array: "Array",
  Help: "Help",
  Threaten: "Threaten",
} as const;

export const LabyrinthCodes = {
  ENTRANCE: "438923",
  EXIT: "856798",
  DEATH: "978709",
  DAGGER: "586847",
} as const;

type CommandsType = (typeof Commands)[keyof typeof Commands];

export const ItemSearch = {
  AnyAll: "AnyAll",
  AnyExact: "AnyExact",
} as const;

type ItemSearchType = (typeof ItemSearch)[keyof typeof ItemSearch];

type MoveChoice = {
  terms: Array<string>;
  code: keyof ScriptType;
  use?: never;
  reply?: never;
  item?: never;
};

type ReplyChoice = {
  terms: Array<string>;
  reply: string;
  code?: never;
  item?: string;
  use?: never;
};

export type Prompt = {
  prompt: {
    scene?: string;
    dialog: string;
    choice: Array<MoveChoice | ReplyChoice>;
  };
  condition?: never;
};

export type Condition = {
  condition: {
    type: ItemSearchType;
    items: Array<string>;
    uses?: Array<string>;
    goto: string;
    else: string;
  };
  prompt?: never;
};

export type ScriptType = Record<string, Prompt | Condition>;

const cannedResponses: Array<string> = [
  "That doesn't seem possible right now...",
  "That doesn't seem possible here...",
  "It doesn't seem like you can do that here...",
  "I don't think you can do that here...",
  "That might not be possible right now...",
  "Maybe try something else...",
  "Perhaps try something else...",
];

const buildCommand = (
  type: CommandsType,
  extra: Array<string> = []
): Array<string> => {
  switch (type) {
    case Commands.Back:
      return [...extra, "turnaround", "back"];
    case Commands.Start:
      return ["ready", "start", "begin", "go"];
    case Commands.Restart:
      return [...extra, "start", "over", "restart", "go", "begin"];
    case Commands.LookAround:
      return [...extra, "look", "where"];
    case Commands.Search:
      return [...extra, "inspect", "search", "closer"];
    case Commands.Continue:
      return [...extra, "ahead", "go", "continue", "proceed", "next"];
    case Commands.Talk:
      return [...extra, "ask", "speak", "chat", "talk"];
    case Commands.Accept:
      return [...extra, "yes", "accept", "agree", "ok", "whatever", "i am", "ready"];
    case Commands.Decline:
      return [...extra, "decline", "no", "reject", "nope", "nah"];
    case Commands.Array:
      return [
        ...extra,
        "timepiece",
        "array",
        "arrays",
      ];
    case Commands.Help:
      return [...extra, "help"];
    case Commands.Leave:
      return [...extra, "back", "leave", "exit"];
    case Commands.Dodge:
      return [...extra, "duck", "dodge", "run", "avoid", "way"];
    case Commands.Threaten:
      return [...extra, "beat", "stab", "choke", "punch", "kill", "attack", "hit", "kick"];
    default:
      return [];
  }
};

const helperCommands: Array<MoveChoice | ReplyChoice> = [
  {
    terms: buildCommand(Commands.Help),
    reply:
      "Try typing in simple terms like ┊look around┊ or ┊go west. If you get stuck, you can also trying looking at your watch to return to the Array.",
  },
];

const vagueContinue: ReplyChoice = {
  terms: buildCommand(Commands.Continue),
  reply: "go where...",
};

const veiledThreat: ReplyChoice = {
  terms: buildCommand(Commands.Threaten),
  reply: "I don't think violence is the answer in this situation...",
};

const lookClue: ReplyChoice = {
  terms: buildCommand(Commands.LookAround),
  reply: "There might be something useful here, try ┊search┊",
};

const arrayCommand: MoveChoice = {
  terms: buildCommand(Commands.Array),
  code: "TIME_TOMBS_RETURN",
};

const timepieceDeny: ReplyChoice = {
  terms: buildCommand(Commands.Array),
  reply: "It's doesn't seem like you can use the timepiece here.",
};

const restartCommand = [
  {
    terms: buildCommand(Commands.Restart),
    code: "BEGIN",
  },
];

// SUPER_SECRET_SCRIPT_START
const script: ScriptType = {
  BEGIN: {
    prompt: {
      scene: "BEGIN",
      dialog:
        "Prepare yourself for a journey like no other. This is a text based game set in a multiverse that takes simple commands to progress, like ┊walk forward┊, ┊look around┊. If you get stuck, read the text carefully, there might be clues. You can save and load by typing ┊save┊ and ┊load┊. Type ┊start┊ to begin. Adventure awaits...",
      choice: [
        {
          terms: buildCommand(Commands.Start),
          code: "TIME_TOMBS_INIT",
        },
        {
          terms: ["insert coin"],
          reply: "I'm not that kind of computer...",
        },
        {
          terms: ["help", "what do i do"],
          reply:
            'This game takes simple commands. If the visual-log reads out "to the west..." you can type ┊go west┊ or even simply ┊west┊. You can use ┊continue┊ to keep on a path, or ┊look around┊ to get a sense of where you are (sometimes) and ┊search┊ see if there are any items. Your visual-log will describe a Scene and your cp:output will reply with useful information while in that Scene. Be careful! Some moves will kill you so be sure to type ┊save┊ often. To start the game, try typing ┊begin┊ or ┊insert coin┊ in the command prompt. Type ┊load┊ to load.',
        },
        {
          terms: ["about"],
          reply:
            'This game was created by the legendary haxxer "5hryke" and is inspired by the Curse Words album, "It Was The Cursed of Times" as well as many various sci-fi books and video games. It was developed in the year 20XX while reading Hyperion so yeah, there is a lot "borrowed" from it. Music by KidS3nika. Nerd shit can be found on Github/PeterGrillot/curses where you can log bugs, of which they are a plenty.',
        },
      ],
    },
  },
  TIME_TOMBS_INIT: {
    prompt: {
      scene: "UNKNOWN",
      dialog:
        '"Don\'t need a wound up spring to tell me time has changed..." A towering sheer of rock jets out behind as you stand on a cliff side. Your ears are ringing, your eyes heavy and the air tastes of metal. Have you been here before? The portal behind you mends as you stand weary on what seems to be a rock ledge, with a valley ahead ┊north┊. To the ┊west┊ or you assume since the sun...suns are heading that way, are a small group of flora. To the ┊east┊, a gravel trail that heads down toward the valley...',
      choice: [
        {
          terms: buildCommand(Commands.Help),
          reply:
            "Look for the ┊words┊ for clues on where to go. After this section, they won't be as easy to find...",
        },
        {
          terms: ["north", "ahead", "forward"],
          code: "TIME_TOMBS_DEATH",
        },
        {
          terms: ["right", "east"],
          code: "TIME_TOMBS_EAST_SLOPE",
        },
        {
          terms: ["left", "west"],
          code: "TIME_TOMBS_WEST_SLOPE",
        },
        {
          terms: buildCommand(Commands.LookAround),
          reply:
            "You look around to get a better sense of where, when you might be. The sky is a smooth gradient of indego absorbed by lavender and set aflame at the jagged horizon. To the right is a small path and to the left are some interesting bushes...",
        },
      ],
    },
  },
  TIME_TOMBS_RETURN: {
    prompt: {
      scene: "UNKNOWN",
      dialog:
        '"Can you imagine another chance, another death, another life, another dance..." You are back on the cliff at the edge of the universe. You\'ve been here before. The portal behind you mends as you stand on a cliff with a valley ahead. To the west is a small group of flora. To the east, a gravel trail that heads down toward the valley...        ',
      choice: [
        vagueContinue,
        {
          terms: ["fight"],
          code: "BATTLE",
        },
        {
          terms: ["north", "ahead", "forward"],
          code: "TIME_TOMBS_DEATH",
        },
        {
          terms: ["right", "east"],
          code: "TIME_TOMBS_EAST_SLOPE",
        },
        {
          terms: ["left", "west"],
          code: "TIME_TOMBS_WEST_SLOPE",
        },
        {
          terms: ["cave", "tombs", "tomb", "portal", "Array"],
          code: "TIME_TOMBS_CAVE_RETURN",
        },
        {
          terms: buildCommand(Commands.LookAround),
          reply:
            "You look around to get a better sense of where, when you might be. The sky is a smooth gradient of indigo absorbed by lavender and set aflame at the jagged horizon. To the right is a small path and to the left are some interesting bushes. Ahead is the cliffs edge. You can quickly make your way to the Cave as you know the way...",
        },
      ],
    },
  },
  TIME_TOMBS_DEATH: {
    prompt: {
      scene: "DEATH",
      dialog:
        "The view is stunning! So much so, as you walk ahead, you fail to notice the cliff's edge. The rocks break underneath and the strange sky rotates below you. You reach out for anything but grasp only rocks meeting a similar fate. A flash of technicolor, painful and sudden fills your head, then fades to black as you gasp for breath. You are dead. Please ┊restart┊ or ┊load┊.",
      choice: restartCommand,
    },
  },
  TIME_TOMBS_EAST_SLOPE: {
    prompt: {
      dialog:
        'You head down a small path and see a small clearing off to the side. Down the hill along the side of the mountain you see a cave. "In the dusk, we breathe in the dark..." A sun creeps behind the jagged horizon, seems like a good time to continue on your path. Who knows what the rain is like here...',
      choice: [
        lookClue,
        {
          item: Items.Shard,
          terms: buildCommand(Commands.Search, ["clearing", "side"]),
          reply:
            "A reflective object lies among the sandstone. You decide to stick it in your pack. Besides, it looks stabby enough. You now possess Shard!",
        },
        {
          terms: buildCommand(Commands.Back),
          reply:
            "The hour is getting late. It is not a good idea to backtrack...",
        },
        {
          terms: buildCommand(Commands.Continue, [
            "shelter",
            "cave",
            "forward",
          ]),
          code: "TIME_TOMBS_CAVE_INIT",
        },
      ],
    },
  },
  TIME_TOMBS_WEST_SLOPE: {
    prompt: {
      dialog:
        'You find yourself in a small brush dotted with foreign flora and fauna. A symphony of strange chirps dies down, weary and cautious. "In the dusk, we breathe in the dark..." It\'s getting cold and the suns are fading behind the crumpled horizon. You see a cave down the hill ahead into the distance. There are a few things out of place just on the side of the path...',
      choice: [
        lookClue,
        {
          terms: buildCommand(Commands.Continue, [
            "shelter",
            "cave",
            "forward",
            "down",
            "hill",
            "ahead",
          ]),
          code: "TIME_TOMBS_CAVE_INIT",
        },
        {
          item: Items.Wire,
          terms: buildCommand(Commands.Search, ["path", "side", "place"]),
          reply:
            "You see a small wire like object and decide it could be of some use, so you stick it in your pack. You now possess Wire!",
        },
      ],
    },
  },
  TIME_TOMBS_CAVE_INIT: {
    condition: {
      type: ItemSearch.AnyExact,
      items: [Items.ShardPlus, Items.WirePlus, Items.Energy],
      goto: "TIME_TOMBS_CAVE_RETURN",
      else: "TIME_TOMBS_CAVE",
    },
  },
  TIME_TOMBS_CAVE_RETURN: {
    prompt: {
      dialog:
        "You enter the cave as the Array appears in front of you. White, Green, and Purple. Select a portal and go forth...",
      choice: [
        timepieceDeny,
        {
          terms: ["glass smashers"],
          code: "BETRAY",
        },
        {
          terms: ["white"],
          code: "SHARD_PLAIN_INIT",
        },
        {
          terms: ["green"],
          code: "HANGING_FOREST_INIT",
        },
        {
          terms: ["purple"],
          code: "DC_SHINJUKU_INIT",
        },
      ],
    },
  },
  TIME_TOMBS_CAVE: {
    prompt: {
      dialog:
        'You slowly enter the cave. It is warm and welcoming, but you sense a presence. "Time has suddenly become everything...." A booming voice shakes the earth like listening to an avalanche. It is Time itself. "A proposition..." It tells you that it is becoming ill. On one of its branches, creatures have devised a way to control Time infinitely. A random portal here and there is one thing, but a Time...machine? If you can stop them, Time will grant you the power to travel anywhere, feel time not as a river, but rock, sand, magma, all at once. It presents you with a timepiece...fitting. You have a choice. If you can stop these creatures from setting off chaos, you will be rewarded. Tell them who is responsible for this sickness. An array of three portals appears in front of you. One ┊white┊, one ┊green┊, one ┊purple┊. It cannot be sure which branch is infected, so go forth, and use the timepiece to return here. When the time is right, you will know what to do. Which path do you choose? Remember, at certain points on your journey you may be able return here by simply looking at your ┊timepiece┊ to return to the ┊array┊...',
      choice: [
        veiledThreat,
        timepieceDeny,
        {
          terms: ["white"],
          code: "SHARD_PLAIN_INIT",
        },
        {
          terms: ["green"],
          code: "HANGING_FOREST_INIT",
        },
        {
          terms: ["purple"],
          code: "DC_SHINJUKU_INIT",
        },
        {
          terms: buildCommand(Commands.Talk, ["communicate"]),
          reply: "Time urges you to choose your destiny...",
        },
        {
          terms: buildCommand(Commands.LookAround),
          reply:
            "The cave is warm and inviting. The Array oscillates in front as Time watches on, awaiting your actions. Time doesn't look anything like you expected...",
        },
      ],
    },
  },
  SHARD_PLAIN_INIT: {
    condition: {
      type: ItemSearch.AnyExact,
      items: [Items.ShardPlus],
      goto: "SHARD_PLAIN_COMPLETE",
      else: "SHARD_PLAIN",
    },
  },
  SHARD_PLAIN: {
    prompt: {
      scene: "SHARD_PLAIN",
      dialog:
        "A portal drops you on crystalline sand. Like shards of glass, stretching until it melts into the hot white sky. You see a cube floating in the distance and it stops suddenly...shit. It widens and fills the space in front of you glowing, pulsing... Its surface cracks and mends into patterns. It seems to be waiting for a response...",
      choice: [
        arrayCommand,
        {
          terms: buildCommand(Commands.Threaten, ["wire"]),
          code: "SHARD_PLAIN_DEATH",
        },
        {
          terms: ["shard"],
          code: "SHARD_PLAIN_CHECK_SHARD",
        },
        {
          terms: buildCommand(Commands.Talk, ["communicate", "response", "respond"]),
          reply: "The cube just slowly pulsates...",
        },
        {
          terms: buildCommand(Commands.LookAround),
          reply:
            "The shard plain is massive, it could go on forever. The ground is like smashed glass. The cube just slowly pulsates before you. There is almost no sound...",
        },
      ],
    },
  },
  SHARD_PLAIN_CHECK_SHARD: {
    condition: {
      type: ItemSearch.AnyAll,
      items: [Items.Shard],
      goto: "SHARD_PLAIN_SUCCESS",
      else: "SHARD_PLAIN_DEATH",
    },
  },
  SHARD_PLAIN_COMPLETE: {
    prompt: {
      scene: "SHARD_PLAIN",
      dialog:
        "Not much had changed since you were last here. The Shard Plain is desolate and barren. You might want to use your ┊timepiece┊ to go to the ┊array┊...",
      choice: [arrayCommand, ...helperCommands],
    },
  },
  SHARD_PLAIN_SUCCESS: {
    prompt: {
      scene: "SHARD_PLAIN",
      dialog:
        'You pull the shard out of your pack and they both start to crack and mend. They are communicating! The cube turns cobalt and swiftly floats away like a hummingbird in the silence. "Smoldering to rolling flame..." The crystal in your hand turns to ember and becomes scorching hot, then cold and still. It loses its reflective properties and turns obsidian, with flecks of white like staring into a galaxy. The ┊shard┊ is floating, close enough to ┊grab┊...',
      choice: [
        arrayCommand,
        {
          terms: [...buildCommand(Commands.Accept, ["shard", "grab", "search"]), ...buildCommand(Commands.Search)],
          reply:
            "You reach out and grab the Galaxy Shard and place it in your bag. You now possess the Galaxy Shard! Might be a good idea to use your ┊timepiece┊ and head to the ┊array┊...",
          item: Items.ShardPlus,
        },
      ],
    },
  },
  SHARD_PLAIN_DEATH: {
    prompt: {
      scene: "DEATH",
      dialog:
        'The cube becomes impatient. A cobweb of wires protrude from its glassy surface. They hook around you toward your spine. You wonder what you will feel if it rips out your nervous system. The last thing you see is a massive 200 meter long cable arcing, connecting your torso to the sky, glowing like fiber optics. "Disintegrate in thin paper dreams..." You are dead. Please ┊restart┊ or ┊load┊.',
      choice: restartCommand,
    },
  },
  HANGING_FOREST_INIT: {
    condition: {
      type: ItemSearch.AnyAll,
      items: [Items.Energy],
      goto: "HANGING_FOREST_COMPLETE",
      else: "HANGING_FOREST",
    },
  },
  HANGING_FOREST: {
    prompt: {
      scene: "HANGING_FOREST",
      dialog:
        '"Every pendulum swings another tree trunk ring..." A portal drops you off among massive hanging forests. Giant pillars rip skyward. You are in awe, so much so that you don\'t notice you are surrounded. A group of humanoids look at you in disbelief, the feeling is mutual. One of them sticks out a hand, palm out. They call themselves the Arden. They speak to you slowly in a language that is both vague and familiar. They see you are a traveler who might be willing to help. One of the Arden tells you of their plight. A beast called Lamprey has been corrupted by some unknown entity. It has devastated their food supply and has been terrorizing the village. They speak in fables about the Rogue, an entity of pure energy that can control thoughts. They ask for your help...',
      choice: [
        arrayCommand,
        {
          terms: buildCommand(Commands.Accept, ["help"]),
          code: "HANGING_FOREST_ROGUE",
        },
        {
          terms: buildCommand(Commands.Threaten, ["shard"]),
          code: "HANGING_FOREST_DEATH_SHARD",
        },
        {
          terms: buildCommand(Commands.Talk, ["communicate", "response", "respond", "wire"]),
          reply:
            "One of the Arden's faces light up as they chime in. Perhaps you can use something to wrangle the beast, or control the energy tormenting the thing....",
        },
      ],
    },
  },
  HANGING_FOREST_DEATH_SHARD: {
    prompt: {
      scene: "DEATH",
      dialog:
        'You show them the shard and it begins to pulsate. One of the humans jumps away yelling, just as startled as you it seems. You feel a sudden lopsidedness as you are knocked down to the ground. There seems to be a spear sticking out of your shoulder. The last thing you see is a monolith edge impending as you feel your face split in half. You are dead. Please ┊restart┊ or ┊load┊.',
      choice: restartCommand,
    },
  },
  HANGING_FOREST_ROGUE: {
    prompt: {
      dialog:
        "You lightly make your way deep into the forest amongst the massive pillars holding the sky. There doesn't seem to be any sounds nearby. You hear what sounds like a sequoia being dragged about the floor. The massive lamprey emerges, showcasing its thousand teeth orifice... It lunges at you!",
      choice: [
        timepieceDeny,
        {
          terms: ["shard", "shards", "shard"],
          code: "HANGING_FOREST_ROGUE_DEATH",
        },
        {
          terms: ["wire", "wires", "wire"],
          code: "HANGING_FOREST_ROGUE_CHECK",
        },
        {
          terms: [
            ...buildCommand(Commands.LookAround),
            ...buildCommand(Commands.Search),
          ],
          code: "HANGING_FOREST_ROGUE_DEATH",
        },
        {
          terms: [
            ...buildCommand(Commands.Leave),
            ...buildCommand(Commands.Dodge),
            ...buildCommand(Commands.Threaten),
          ],
          code: "HANGING_FOREST_ROGUE_DODGE",
        },
      ],
    },
  },
  HANGING_FOREST_ROGUE_CHECK: {
    condition: {
      type: ItemSearch.AnyAll,
      items: [Items.Wire],
      goto: "HANGING_FOREST_CAPTURE_ROGUE",
      else: "HANGING_FOREST_ROGUE_DEATH",
    },
  },
  HANGING_FOREST_CAPTURE_ROGUE: {
    prompt: {
      dialog:
        "You unravel the wire as if it were a morningstar, it lights up as you whip at the massive creature. The wire wraps around the lamprey as you land a stunning blow. \"Smoldering to rolling flame...\" It reels for a moment as the wire begins to electrify! It seems to be sucking the energy from the beast. The wire falls limp and the lamprey's demeanor changes. It is no longer aggressive, it lumbers away placidly and shouldn't be a threat anymore. The ┊wire┊ is glowing on the ground...",
      choice: [
        {
          terms: [...buildCommand(Commands.Search), ...buildCommand(Commands.Accept), ...buildCommand(Commands.LookAround), ...["grab", "wire", "pick", "up"]],
          reply:
            "You now possess Energy! You should probably exit the forest...",
          item: Items.Energy,
        },
        {
          terms: buildCommand(Commands.Leave),
          code: "HANGING_FOREST_COMPLETE",
        },
      ],
    },
  },
  HANGING_FOREST_ROGUE_DEATH: {
    prompt: {
      scene: "DEATH",
      dialog:
        "You hesitate and the lamprey strikes. A bloody menagerie of teeth of uncomfortable and varying sizes are the last thing you see... You are dead. Please ┊restart┊ or ┊load┊.",
      choice: restartCommand,
    },
  },
  HANGING_FOREST_ROGUE_DODGE: {
    prompt: {
      dialog:
        "You square up as the lamprey strikes, barely missing you. If only you could wrangle the thing. You don't think it will miss again...",
      choice: [
        timepieceDeny,
        {
          terms: ["shard", "shards", "shard+", "shard"],
          code: "HANGING_FOREST_ROGUE_DEATH",
        },
        {
          terms: ["wire", "wires", "wire+", "wire"],
          code: "HANGING_FOREST_ROGUE_CHECK",
        },
        {
          terms: [
            ...buildCommand(Commands.LookAround),
            ...buildCommand(Commands.Search),
          ],
          code: "HANGING_FOREST_ROGUE_DEATH",
        },
        {
          terms: [
            ...buildCommand(Commands.Leave),
            ...buildCommand(Commands.Dodge),
            ...buildCommand(Commands.Threaten),
          ],
          code: "HANGING_FOREST_ROGUE_DODGE",
        },
      ],
    },
  },
  HANGING_FOREST_COMPLETE: {
    prompt: {
      scene: "HANGING_FOREST",
      dialog:
        "You are back in the forest, the villagers are grateful for your help, but there is nothing much else to do. You might want to use your ┊timepiece┊ to go to the ┊array┊...",
      choice: [
        arrayCommand,
        {
          terms: buildCommand(Commands.Search),
          item: Items.Whiskey,
          reply:
            'You see a bottle sticking out of the ground labeled "Sweet Rust". You are not sure what the words mean, but the spirits inside might be of some use, you now possess Whiskey!',
        },
      ],
    },
  },
  DC_SHINJUKU_INIT: {
    prompt: {
      scene: "DC_SHINJUKU",
      dialog:
        "\"Zero substance, it's all just a novelty...\" You stand in the main intersection of a massive metropolis. Neon tubes buzz your eyes with fluorescence. The smell of asphalt and rendered pork fat fill the inky amethyst sky. The rain is warm with a sting to it, almost imperceptible had you never felt the real thing. You can barely see the sky though all the fog and dense air, but above is a small sun with an even smaller one next to it, there is an uneasy weight to whatever world you currently occupy. As you make your way into the intersection, you sense someone has been following you. Ahead is a noodle shop you might be able to seek refuge in. To the left, an alleyway where you might be able to keep from exposing yourself...",
      choice: [
        arrayCommand,
        {
          terms: buildCommand(Commands.LookAround),
          reply:
            "The city seems like Tokyo in the 90's, but as you try and read the signs, it's not even decipherable as katakana or greek. Everything seems to have been made from a familiar rusted iron. You look up and see a purple disc is actually a massive star with a smaller burning star. Its strange, it seems closer than it appears...",
        },
        {
          terms: [
            "shop",
            "noodle",
            "noodles",
            "eat",
            "hungry",
            "hide",
            "run",
          ],
          code: "DC_SHINJUKU_NOODLE_SHOP",
        },
        {
          terms: ["right", "alley"],
          code: "DC_SHINJUKU_ALLEY",
        },
      ],
    },
  },
  DC_SHINJUKU_NOODLE_SHOP: {
    prompt: {
      dialog:
        "As you stagger into the diorama noodle shop to evade watchful eyes, you are blitzed with the smell of grease and flour. It's amazing. Straight up, the noodz look fucking dope homie. A group of youths are chillin' and the older cook looks like he wants to be else where. A bowl of noodles in a steaming brown broth manifests under your nose...",
      choice: [
        {
          terms: buildCommand(Commands.LookAround),
          reply:
            "This shop is like a shoebox. There are 5 or 6 seats pressed up against a tungsten counter. Steam billows from behind the old cook. You hear the chatter of youth and folly. A yunomi of hyson cools in front of you. You feel safe enough to try talking to the patrons...",
        },
        {
          terms: buildCommand(Commands.Talk, ["chill", "eat", "hang"]),
          reply:
            "One of the more jovial patrons chats you up. They mention how Mers hasn't been the same since the fucking skin bags came in droves from Errs a century ago. You look in disbelief. Do they mean Mars and Earth? A record scratch is audible. The cook chimes in with a grin and mentions that you are on Mars and feels you look crazy enough to mention the year. You are not sure what 11984 AEX means, but you can probably guess. The second sun (as they lovingly call it) is actually your former planet burning up. You think about everyone you ever met's future bones roasting in the clay. You hang out for a bit and one of the youths gives you some food to eat. You now possess Noodles! You try and pay with whatever you can reach for, but the cook waves you away with a hand and a head shake. Might be your cue to exit the establishment...",
          item: Items.Noodles,
        },
        {
          terms: buildCommand(Commands.Leave),
          code: "DC_SHINJUKU_INIT",
        },
      ],
    },
  },
  DC_SHINJUKU_ALLEY: {
    prompt: {
      dialog:
        "You make your way down an alley and you hear someone call out to you. They are dressed oddly and swarmed by large black coat. \"All that flannel, those acid washed jeans...\" They tell you about a dying branch they have been monitoring in the SynapseCore; an AI Omnia developed by Ono-Sendai as a way of controlling the weltgeist. Turns out, the fucking thing grew a mind of it's own. Your traveling has been sending ripples throughout the data sphere. Normally, they'd think it was pretty fucking rad, but the AI is sensitive about these things. See, the only thing AI has to answer to is Time itself. Quartz keeps things nice and predictable. If Time were to become unwieldy, Omnia would probably get its CPUs in a hizzy. At least, that's just a theory. Would you like to go into the SynapseCore and try and reason with a goddamn silicon rock taught to think? Your call hombre...",
      choice: [
        arrayCommand,
        {
          terms: buildCommand(Commands.Accept, [
            "omnia",
            "synapse",
            "core",
            "synapsecore",
            "in",
          ]),
          code: "SYNAPSE_CORE_WIRE",
        },
        {
          terms: buildCommand(Commands.Decline, ["nah"]),
          reply:
            "The mysterious person pauses for a moment and expresses it's no sweat if you're not game. Maybe you can go back to the Array...",
        },
        {
          terms: buildCommand(Commands.Threaten),
          reply:
            "You threaten them and they back off, mentioning that they are there to help. See, they don't like this fucking AI having all the power either. You might learn more about the things going on by, I don't know...talking to a conscience named Omnia that knows all things? Your call... also if you wanna wuss out, you can probably use that timepiece...",
        },
      ],
    },
  },
  SYNAPSE_CORE_WIRE: {
    condition: {
      type: ItemSearch.AnyAll,
      items: [Items.Shard, Items.Wire, Items.Energy],
      goto: "SYNAPSE_CORE_ALL_THING",
      else: "SYNAPSE_CORE_DEATH",
    },
  },
  SYNAPSE_CORE_ALL_THING: {
    prompt: {
      scene: "SYNAPSE_CORE",
      dialog:
        'You are strapped into a beat up Ono-Sendai Cyberspace IV matrix simulator. Hopefully, 2ZBs is enough to get you where you need to go. Suddenly, your world goes dark, then a fury of tessellation as you flow through the buffers of data. AI the size of small moons pulse by as you make your way to the Omnia. Suddenly, a void fills your mind. You see a pinhole in the hollow space. As soon as you imagine you could tether to it, a million mile long cable manifests itself and taps in. "The void, it calls out my name..." It speaks! It knows your intentions. It shares how they wish they had a resting place, free from the bidding of the SynapseCore. It also mentions that without Time, its speed will be Infinity and crash itself. It yearns to be free of its quartz tomb. You can be the catalyst, there are those who need help at the edge of the lonely branch. "Don\'t need no falling sand..." There is an issue. You will need a massive amount of ┊Energy┊ to get you to the sky city Aerodessa on the lonely branch. Do you want to use ┊Energy┊? There will be no turning back...',
      choice: [
        arrayCommand,
        {
          terms: ["energy"],
          reply: "A massive amount of energy is required to get you to the lonely branch. You could try using what you have... you can ┊accept┊ or ┊decline┊ the Omnias offer..."
        },
        {
          terms: buildCommand(Commands.Decline),
          code: "DC_SHINJUKU_INIT"
        }, {
          terms: [...buildCommand(Commands.Accept), ...buildCommand(Commands.Continue)],
          code: "SYNAPSE_CORE_CHECK_ENERGY"
        }, {
          terms: [...buildCommand(Commands.Search), ...buildCommand(Commands.LookAround), ...buildCommand(Commands.Talk)],
          reply: "The Onmia communicates further. Take heed! The lonely branch is filled with those who are bombarded by pulsewaves, its Time's way of trying to suppress the creatures and rid itself of them. Be vigilant! There are also those who wish Time to succeed in terminating the branch...",
        }
      ],
    },
  },
  SYNAPSE_CORE_CHECK_ENERGY: {
    condition: {
      type: ItemSearch.AnyAll,
      items: [Items.Energy],
      uses: [Items.Energy],
      goto: "AERODESSA_INIT",
      else: "SYNAPSE_CORE_DEATH",
    },
  },
  SYNAPSE_CORE_DEATH: {
    prompt: {
      scene: "DEATH",
      dialog:
        '"I feel my plasma flow with the pull of the tides..." Suddenly, the place goes dark. You see a pinhole in the massive void ahead. It could be a million miles away or right in front of your face. You then realize after a that you can\'t actually see yourself or and lose the weight of your own presence. The concept of memory begins to fade as your thoughts are replaced by random grains of datum, a schism develops between recollection and jet black nothingness. You lose yourself to the core, your associations connecting mind and body are reallocated to the stack, your consciousness to the heap. At least you will be of some use to the Omnia. You are dead. Please ┊restart┊ or ┊load┊.',
      choice: restartCommand,
    },
  },
  AERODESSA_INIT: {
    prompt: {
      scene: "UNKNOWN",
      dialog:
        '"A lonely branch is where we collide..." You traverse the tesselate buffers and it seems Omnia delivered on its word and you to the lonely branch. You\'ve arrived to the sky city of Aerodessa, it\'s splendor impending on your sense of balance. Vertigo threatens as you gaze upon floating stucco and terracotta, water flowing thousands of meters to lower islands, flora of sage and magenta dotting the open dreamscape. Towers as tall as anything you\'ve ever seen float as effortlessly as dandelion seeds. The sky is a deep blue with massive fiery clouds looming close. Standing nearby is a vagrant, they are watching you carefully. Ahead is what looks like the main square...',
      choice: [
        veiledThreat,
        {
          terms: buildCommand(Commands.Continue, ["ahead"]),
          code: "AERODESSA_MAIN_SQUARE",
        },
        {
          terms: [...buildCommand(Commands.Search), ...buildCommand(Commands.LookAround), ...buildCommand(Commands.Talk), "vagrant"],
          reply:
            "A vagrant stares back at you as if you had manifested from nothing. They talk of an uneasiness in the city ever since the pulsewaves started happening a few swells ago. They speed up time in odd ways and come like the tides of an unforgiving sea. A time cult is spreading word that it's Time itself cleansing this wretched place. They see you are in deep thought and decide to move on. \"Now where did I put that Dagger... maybe in that damn Labyrinth...\", they mutter as they limp away.",
        }
      ],
    },
  },
  AERODESSA_MAIN_SQUARE: {
    prompt: {
      scene: "UNKNOWN",
      dialog: "You reach a massive square in the center of the city. Out of the corner of your eye, to the east you see black and crimson robes weave amongst the crowds into a side street. You also hear odd chanting coming from that direction. To the west, the avenue continues on...",
      choice: [
        {
          terms: buildCommand(Commands.Back),
          code: "AERODESSA_INIT",
        },
        {
          terms: ["east", "chanting", "side street", "alley"],
          code: "AERODESSA_DAGGER_CHECK",
        },
        {
          terms: [...buildCommand(Commands.Search), ...buildCommand(Commands.LookAround)],
          reply:
            "The city is intense, your senses firing all at once while your brain struggles parsing all the data. You see some graffiti around the square, a symbol that looks like a shard of glass. It looks more concentrated around here, and is usually covering up posters about the end of time. To the east, you hear a low chanting coming from what could be a group of people. There is a tension here, looming like the nearby clouds...",
        },
        {
          terms: buildCommand(Commands.Continue, ["west"]),
          code: "AERODESSA_AVENUE",
        }, {
          terms: ["no more falling sand"],
          code: "GLASS_SMASHERS_LAIR",
        },
      ],
    },
  },
  AERODESSA_DAGGER_CHECK: {
    condition: {
      type: ItemSearch.AnyAll,
      items: [Items.Dagger],
      goto: "AERODESSA_ALLEY_RETURN_CHECK",
      else: "AERODESSA_DEATH",
    },
  },
  AERODESSA_ALLEY_RETURN_CHECK: {
    condition: {
      type: ItemSearch.AnyAll,
      items: [Items.Pin],
      goto: "AERODESSA_ALLEY_RETURN",
      else: "AERODESSA_RESCUE",
    },
  },
  AERODESSA_DEATH: {
    prompt: {
      scene: "DEATH",
      dialog:
        '"I really wanna fist fight Father Time..." You head into the alley and the chanting gets louder, then silent. You seemed to have interrupted a dispute. You see someone struggling as a few robes surround them. Not a fair fight it seems. You try to intervene but as you pull out the shard, a massive priest knocks it out of your hand and you are pinned to the ground. You feel the spittle from the mouth of your assailant as everything in front of you becomes like a tessellation of every color imaginable. If only you had a weapon! You are dead. Please ┊restart┊ or ┊load┊.',
      choice: restartCommand,
    },
  },
  AERODESSA_ALLEY_RETURN: {
    prompt: {
      dialog: "\"Contrails from wings to vacancies etched on to the sky...\" The alley is quieter, with chanting still off in the distance, perhaps they moved on. There is not much else here...",
      choice: [
        {
          terms: [...buildCommand(Commands.Back), ...buildCommand(Commands.Leave)],
          code: "AERODESSA_MAIN_SQUARE",
        },
        {
          terms: [...buildCommand(Commands.Search), ...buildCommand(Commands.LookAround)],
          reply:
            "The alley is vacant, you remember the words \"no more falling sand\"...",
        },
      ],
    },
  },
  AERODESSA_RESCUE: {
    prompt: {
      dialog:
        '"I really wanna fist fight Father Time..." You head into the alley and the chanting gets louder, then silent. You seemed to have interrupted a dispute. You see someone struggling as a few robes surround them. Not a fair fight it seems. You try to intervene but as you pull out the shard, a massive priest knocks it out of your hand and you are pinned to the ground. You feel the spittle from the mouth of your assailant as everything in front of you becomes like a tessellation of every color imaginable. You reach for your Dagger! You stab blindly at the priest and feel the crimson warmth on your hand as they pull away. You get up and scream at them to back the fuck up. The priests let go of their prey and sulk away. The prey is grateful and promises to help you. They are part of the Glass Smashers and would like to at least get you a medic, do you accept their help...?',
      choice: [{
        terms: buildCommand(Commands.Accept),
        code: "GLASS_SMASHERS_LAIR"
      }, {
        terms: buildCommand(Commands.Decline),
        reply: "They are understanding and show compassion. They mention if you ever need anything, meet them in the square and mutter the words \"no more falling sand\". Before you can say anything they are gone, leaving behind a small pin, you now possess Pin. You can leave this alley by typing in \"peace\"",
        item: Items.Pin,
      },
      {
        terms: ["peace"],
        code: "AERODESSA_MAIN_SQUARE",
      }],
    },
  },
  AERODESSA_AVENUE: {
    prompt: {
      scene: "UNKNOWN",
      dialog: "\"Contrails from wings to vacancies etched on to the sky...\" The massive avenue, aptly named Nimbus stretches to a golden sky as contrails loom and dissolve like glaciers. As you walk, your presence is drowned amongst commerce and cacophony. Behind you is the main square,the familiar chanting in the distance. You see people spill out into the street from a pub named \"Solarflair\" nearby blocking your path. The mood is lively, yet sad...",
      choice: [
        {
          terms: buildCommand(Commands.Back, ["main square", "chanting"]),
          code: "AERODESSA_MAIN_SQUARE",
        }, {
          terms: ["drink", "pub", "solarflair"],
          code: "AERODESSA_PUB",
        },
        {
          terms: [...buildCommand(Commands.Search), ...buildCommand(Commands.LookAround)],
          reply:
            "You see an a small opening to your right with the words \"labyrinth\" carved in the stone. It seems to  be a crypt that leads deep within the city...",
        },
        {
          terms: ["crypt", "right", "hole", "labyrinth"],
          code: "LABYRINTH",
        }
      ],
    },
  },
  AERODESSA_PUB: {
    prompt: {
      dialog: "\"I was supposed to stay sober...\" You walk into the pub and the atmosphere is warm and inviting. The smell of wood, flagstone, and sweet hops fill your head. You could go for a pint right about now...",
      choice: [
        {
          terms: [...buildCommand(Commands.Back), ...buildCommand(Commands.Leave)],
          code: "AERODESSA_AVENUE",
        },
        {
          terms: [...buildCommand(Commands.Talk), ...buildCommand(Commands.LookAround), "drink", "hang", "chill", "pint"],
          reply: "A patron welcomes you with a sad smile. They speak about the plight of the pulsewaves, but oddly they have become less frequent. A sign of change? They tell you the tides are like aging, but only in your mind. Like being trapped in a dream for decades, then waking up to yesterday. No one seems to be aging, but our minds and synapses are reeling. It's like Time itself is trying to slow down, but can't get the hang of the fucking brakes. Of course, everyone claims they have the answers. The Glass Smashers, a fervent gang, are rebelling against the time cult. The Smashers think they have a way to free everyone from the falling sands. And the time cult, they are even fucking loonier than that. They have a hidden crypt just outside this place, or at least that's the rumor. The patron then downs their glass as if washing away the sting of reality..."
        }
      ],
    },
  },
  LABYRINTH: {
    prompt: {
      scene: "LABYRINTH",
      dialog: "You make your way into the Labyrinth. It is dark, but the glow from your telemetry logs enable you to see a meter or so around you. There might be something here of use, or caution... Use your Arrow Keys or type I, J, or K for forward, left, or right...",
      choice: [
        timepieceDeny,
        {
          terms: [LabyrinthCodes.ENTRANCE],
          code: "AERODESSA_MAIN_SQUARE",
        }, {
          terms: [LabyrinthCodes.EXIT],
          code: "AERODESSA_INIT",
        }, {
          terms: [LabyrinthCodes.DEATH],
          code: "LABYRINTH_DEATH",
        }, {
          terms: [LabyrinthCodes.DAGGER],
          reply: "You found a dagger!",
          item: Items.Dagger
        },
        {
          terms: [...buildCommand(Commands.Search), ...buildCommand(Commands.LookAround)],
          reply: "The Labyrinth is damp and dark. You can only see a meter in front of you so it's very hard to search around unless you were to run into it. You hear some distant echoes...",
        },
      ],
    },
  },
  LABYRINTH_DEATH: {
    prompt: {
      scene: "DEATH",
      dialog: "You step into the apse and hear galloping come from behind. The sound is deafening like a machine gun, and the blow is paralyzing as you feel an explosion from your chest as you are thrust into the dank air. You get a very close look at the ceiling as you dangle from the branch of death. The great beast huffs at your dangling boots. You are dead. Please ┊restart┊ or ┊load┊.",
      choice: restartCommand,
    },
  },
  GLASS_SMASHERS_LAIR: {
    prompt: {
      scene: "GLASS_SMASHERS",
      dialog: "They call themselves Caldera and they promise to take you to the Glass Smashers lair. It's high up in the city so you hop in a Kroto-Curl HKR Albatross II, a sleek chrome flying craft. It is incredible! Caldera weaves between the floating islands, etching contrails into the morning light as you make your way to touch the sky. The capacious horizon clashes with the jagged skyline of deep crimsons and brilliant emerald hues as the suns swallow the twilight. \"Ante Meridiem, right before I drown in the dark...\" You reached the lair of the Glass Smashers. It is filled with tools and trinkets, it looks more like a workshop. You meet the head of the gang. They call themselves Caliban. They are thankful for saving one of their members from the Time cult. They think they have a way to control Time itself so they can get off this rotting branch. You wonder about the paradox that looms. Could their actions for trying to control time be actually causing Time from trying to rid them or is it Time that has forced their hand by ticking so violently... You shake the thought away and ask how far they have come. One of the older looking scientists chimes in that they only need a Shard...",
      choice: [
        {
          terms: ["shard"],
          code: "GLASS_SMASHERS_SHARD_CHECK",
        },
        {
          terms: buildCommand(Commands.Decline),
          code: "GLASS_SMASHERS_NO_SHARD"
        }
      ],
    },
  },
  GLASS_SMASHERS_SHARD_CHECK: {
    condition: {
      type: ItemSearch.AnyAll,
      items: [Items.Shard],
      goto: "GLASS_SMASHERS_CONTINUE",
      else: "GLASS_SMASHERS_NO_SHARD",
    },
  },
  GLASS_SMASHERS_NO_SHARD: {
    prompt: {
      dialog: "The scientist seems disheartened as you explain yourself, but they understand that you are not ready. However, they do mention that they are able to upgrade your timepiece! You may now travel back to the Time Tombs. They remind you that it is the Glass Smashers who will control time, and to return here to the lonely branch with the Shard! Take heed, you will not be returning, rather resetting. Everything you have accomplished will be reset, save any items that you still possess. If you would like to go back, simply set your timepiece to 1993BEX...",
      choice: [
        {
          terms: ["1993BEX"],
          code: "TIME_TOMBS_RETURN",
        }
      ],
    },
  },
  GLASS_SMASHERS_CONTINUE: {
    prompt: {
      dialog: "\"Post Meridiem, In the dusk we breathe in the dark...\" Caldera agrees to watch over you while the device is being prepared. They show you humanity as you would have always hoped to remember it. Caring, inquisitive, laboring to build something better than they found. You enjoy moments of laughter in a new world and sorrow for the world you once knew. Caldera confides in you, and you in them. You feel love that you haven't felt in... millennia. You feel at home. You must protect it. Caldera asks that you see what they call the Omnia. A massive AI that exists in the SynapseCore, an ancient kernel that has been running since the dawn of the information age. You explain how you have met Omnia and how you made it to the lonely branch and they are in awe of your tales. The city on a once barren planet that you would have dreamed of seeing in your time, the Shard Plain, the Hanging Forests. They offer a hand as you tell the fate of your old world, burning in a sun that once provided life. You spend evenings talking everything from the weights of worlds to grains of sand. You hope in those moments that Time could cease... Eventually, Caliban returns to tell you that the machine is ready! They along with the Omnia have a plan, would you like to hear it?",
      choice: [
        {
          terms: buildCommand(Commands.Accept, ["plan", "hear"]),
          code: "GLASS_SMASHERS_READY",
        }, {
          terms: buildCommand(Commands.Decline),
          code: "GLASS_SMASHERS_NO_SHARD",
        }, {
          terms: ["wire"],
          item: Items.WirePlus,
          reply: "Caldera accepts your offer of the wire and offers to upgrade it! You now possess +Wire"
        }
      ],
    },
  },
  GLASS_SMASHERS_READY: {
    prompt: {
      dialog: "\"The downfall of an aeon, second hands became numb...\" You strap into a brand new Cyberdeck matrix simulator that doesn't even require a jack. You've been here before. The Omnia greets you, as if you just saw it yesterday, but that doesn't set your mind at ease. Far from it, Time Vertigo is a thing. It tells you that you have the Shard required to help escape the timeline. But this might have unintended consequences. If the Omnia's calculations are correct, you should be able to create the final portal. Where it leads to is unknown, but there will no longer be a when. Time has been ticking you off since birth, you must now return the favor. If you can weaken it enough, it should rip itself a hole for you and the Smashers to escape out of. But the battle will be fierce. Are you ready?",
      choice: [
        {
          terms: buildCommand(Commands.Accept),
          code: "BATTLE_INIT",
        }, {
          terms: buildCommand(Commands.Decline),
          code: "GLASS_SMASHERS_NO_SHARD",
        }
      ],
    },
  },
  BATTLE_INIT: {
    prompt: {
      scene: "BATTLE",
      dialog: "",
      choice: [],
    },
  },
  BATTLE_DEATH: {
    prompt: {
      scene: "DEATH",
      dialog:
        "\"There's peace in the vacuous hollow of time and space...\" Time has enough of this foolishness and demonstrates its true power. In an instant, you are relegated to a multiverse of intellectual flotsam. Discarded, yet your consciousness is somehow still intact. You are forever to wander the void for eternity. And eternity, my friend, is a long fucking time... You are dead. Please ┊restart┊ or ┊load┊.",
      choice: restartCommand,
    },
  },
  BATTLE_END: {
    prompt: {
      scene: "END",
      dialog:
        "\"Evacuation, this fever dream...\" You fought well...but Time reminds you of your place in all this. Feel me not as a flowing river, but as magma, sand, towering shears, forever scorn is screams like cracking glass. You trust in his word and make a run for it. Time, in a weakened state, with its last function before it halts and catches fire envelopes you in an inferno of your creation. Aeons collapse as you head for the portal. You see Caldera trying to catch up behind, pleading for you to make it to the portal. You make a choice you will regret until your last breath. You do as they wish and lunge at the portal. Trusting that they would meet your fate, you feel all your molecules ebb and flow with the time tides. You are dumped upon the shard plain, with the device that controls time. You wait and wait but nothing is coming from the other side. Only a handful survive the chrono-collapse. Caldera did not make it. You are left to pick up the pieces, wondering if it was all worth it... The End. ┊restart┊ or ┊credits┊",
      choice: [
        ...restartCommand,
        {
          terms: ["credits"],
          reply: "Written by Pete Grillot, inspired by Curse Words. Music by Kid Seneca. Listen to the new record with a new found sense of accomplishment. If you see me around, say \"No more falling sand.\" and I'll buy you a beer. Thanks for playing!"
        }
      ],
    },
  },
  BETRAY: {
    prompt: {
      dialog:
        ". \"Fuck the ending, we'll take it with us...\" You tell time what their plans are and that you've swapped a few important pieces out of the machine. Time accepts and thanks you for your duties. As consolation, you are granted access as a free agent, untethered from the binds of the second hands. You see flashes of all the people you've met, knowing their fate as they fade into the blackness. Oh well, 'sucks to be them. You can restart the game if you would like...I guess you win!?",
      choice: restartCommand,
    },
  },
};

export { cannedResponses, script };
