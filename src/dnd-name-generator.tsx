import React, { useState } from 'react';
import { Sparkles, RefreshCw, Copy, Check, Dice6, Wand2, Sword, Shield, User, Scroll } from 'lucide-react';

const DnDGenerator = () => {
  const [character, setCharacter] = useState(null);
  const [selectedRace, setSelectedRace] = useState('random');
  const [selectedClass, setSelectedClass] = useState('random');
  const [selectedLevel, setSelectedLevel] = useState('1');
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatingBackstory, setGeneratingBackstory] = useState(false);

  const races = [
    'Human', 'Elf', 'Dwarf', 'Halfling', 'Dragonborn', 
    'Gnome', 'Half-Elf', 'Half-Orc', 'Tiefling', 
    'Aarakocra', 'Tabaxi', 'Goliath', 'Firbolg',
    'Kenku', 'Lizardfolk', 'Triton', 'Aasimar'
  ];

  const classes = [
    'Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter',
    'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer',
    'Warlock', 'Wizard', 'Artificer', 'Blood Hunter'
  ];

  const alignments = [
    'Lawful Good', 'Neutral Good', 'Chaotic Good',
    'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
    'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'
  ];

  const backgrounds = [
    'Acolyte', 'Charlatan', 'Criminal', 'Entertainer', 'Folk Hero',
    'Guild Artisan', 'Hermit', 'Noble', 'Outlander', 'Sage',
    'Sailor', 'Soldier', 'Urchin', 'Far Traveler', 'Haunted One'
  ];

  const namesByRace = {
    Human: {
      first: ['Aldric', 'Brenna', 'Cedric', 'Diana', 'Ewan', 'Freya', 'Gareth', 'Helena', 'Ivan', 'Jade', 'Kael', 'Luna', 'Magnus', 'Nora', 'Owen'],
      last: ['Blackwood', 'Ironforge', 'Stormwind', 'Silverbrook', 'Thornheart', 'Ashmore', 'Brightblade', 'Darkwater', 'Goldmane', 'Highhill']
    },
    Elf: {
      first: ['Aelindor', 'Elara', 'Faelen', 'Ilyana', 'Theron', 'Lyra', 'Caelum', 'Sylvara', 'Arannis', 'Miriel', 'Elandor', 'Nessa', 'Varis', 'Elenwe'],
      last: ['Moonwhisper', 'Starweaver', 'Dawnblade', 'Nightbreeze', 'Silverleaf', 'Shadowsong', 'Lightbringer', 'Forestwalker', 'Sunfire', 'Mistdancer']
    },
    Dwarf: {
      first: ['Thorin', 'Brunhilde', 'Grimm', 'Helga', 'Balin', 'Dagmar', 'Thrain', 'Inga', 'Borin', 'Gerda', 'Rurik', 'Kathra', 'Brokk', 'Mara'],
      last: ['Stonehammer', 'Ironbeard', 'Goldseeker', 'Battleaxe', 'Deepdelver', 'Forgeborn', 'Rockfist', 'Steelshield', 'Gemcutter', 'Mountainheart']
    },
    Halfling: {
      first: ['Bilbo', 'Rosie', 'Merric', 'Lidda', 'Cade', 'Verna', 'Finnan', 'Portia', 'Reed', 'Bella', 'Pip', 'Willow', 'Roscoe', 'Marigold'],
      last: ['Goodbarrel', 'Tealeaf', 'Greenbottle', 'Thorngage', 'Underbough', 'Lightfoot', 'Nimblefingers', 'Burrows', 'Hillside', 'Sweetwater']
    },
    Dragonborn: {
      first: ['Arjhan', 'Biri', 'Donaar', 'Farideh', 'Ghesh', 'Heskan', 'Kriv', 'Medrash', 'Nadarr', 'Sora', 'Tarhun', 'Mishann', 'Patrin', 'Nala'],
      last: ['Myastan', 'Ophinshtalajiir', 'Fenkenkabradon', 'Kerrhylon', 'Turnuroth', 'Verthisathurgiesh', 'Bharaclaiev', 'Daardendrian', 'Delmirev', 'Yarjerit']
    },
    Gnome: {
      first: ['Alston', 'Breena', 'Dimble', 'Ellywick', 'Folkor', 'Nyx', 'Orryn', 'Zook', 'Warryn', 'Callybon', 'Sindri', 'Bimpnottin', 'Kellen', 'Delebean'],
      last: ['Tinkertop', 'Fizzlebang', 'Sparklegem', 'Nackle', 'Scheppen', 'Roondar', 'Timbers', 'Garrick', 'Raulnor', 'Beren']
    },
    'Half-Elf': {
      first: ['Talon', 'Seraphina', 'Kael', 'Aria', 'Rowan', 'Elara', 'Daren', 'Liora', 'Kylan', 'Nessa', 'Ash', 'Celeste', 'Finn', 'Iris'],
      last: ['Shadowend', 'Brightwater', 'Ashwood', 'Moonbrook', 'Starling', 'Ravencrest', 'Duskwalker', 'Thornwynd', 'Silverstream', 'Willowshade']
    },
    'Half-Orc': {
      first: ['Ghor', 'Ovak', 'Dench', 'Baggi', 'Thokk', 'Mhurren', 'Holg', 'Shump', 'Keth', 'Ront', 'Feng', 'Grat', 'Volen', 'Yevelda'],
      last: ['Skullcrusher', 'Bloodaxe', 'Warbringer', 'Ironhide', 'Bonecruncher', 'Goretusk', 'Grimjaw', 'Stonefist', 'Blackscar', 'Thunderstrike']
    },
    Tiefling: {
      first: ['Azazel', 'Nemeia', 'Damakos', 'Akta', 'Therai', 'Kallista', 'Morthos', 'Orianna', 'Zariel', 'Euphemia', 'Carnage', 'Delight', 'Torment', 'Sorrow'],
      last: ['Virtue: Hope', 'Virtue: Sorrow', 'Virtue: Reverence', 'Virtue: Despair', 'Virtue: Excellence', 'Virtue: Music', 'Virtue: Silence', 'Virtue: Quest', 'Virtue: Random', 'Virtue: Wit']
    },
    Aarakocra: {
      first: ['Aera', 'Quaf', 'Zeed', 'Kreeak', 'Kuura', 'Caaw', 'Reeak', 'Ssk', 'Zeek', 'Ikki', 'Heeak', 'Oorr', 'Aial', 'Quierk'],
      last: ['Cloudchaser', 'Skyscream', 'Windrider', 'Eagleclaw', 'Stormfeather', 'Highsoar', 'Talon', 'Windwhisper', 'Swiftflight', 'Sunwing']
    },
    Tabaxi: {
      first: ['Cloud', 'Rain', 'Mist', 'Shadow', 'Ember', 'Dawn', 'Moon', 'River', 'Storm', 'Frost', 'Whisper', 'Thunder', 'Breeze', 'Smoke'],
      last: ['on the Mountain', 'in the Night', 'over Water', 'through Trees', 'at Dawn', 'beneath Stars', 'of the Valley', 'at Twilight', 'in Morning', 'by Fire']
    },
    Goliath: {
      first: ['Aukan', 'Gae-Al', 'Ilikan', 'Keothi', 'Kuori', 'Lo-Kag', 'Maveith', 'Nalla', 'Vaunea', 'Thalai', 'Thuliaga', 'Uthal', 'Vimak', 'Pethani'],
      last: ['Anakalathai', 'Elanithino', 'Gathakanathi', 'Kalagiano', 'Kolae-Gileana', 'Ogolakanu', 'Thuliaga', 'Thunukalathi', 'Vaimei-Laga', 'Kalagiano']
    },
    Firbolg: {
      first: ['Adler', 'Autumn', 'Birch', 'Brook', 'Cedar', 'Daisy', 'Elm', 'Fern', 'Grove', 'Hazel', 'Iris', 'Maple', 'Oak', 'Pine'],
      last: ['Meadowkeeper', 'Forestfriend', 'Rootwalker', 'Leafwhisperer', 'Stonecarver', 'Berrybloom', 'Treestrider', 'Mossbeard', 'Earthsong', 'Wildgrowth']
    },
    Kenku: {
      first: ['Caw', 'Croak', 'Screech', 'Whistle', 'Chirp', 'Echo', 'Rattle', 'Chime', 'Click', 'Creak', 'Rustle', 'Snap', 'Trill', 'Hoot'],
      last: ['of Shadows', 'from Below', 'the Mimic', 'Echoing Voice', 'the Silent', 'Stolen Words', 'Dark Feather', 'Quick Talons', 'the Watcher', 'Memory Keeper']
    },
    Lizardfolk: {
      first: ['Achuak', 'Aryte', 'Baeshra', 'Darastrix', 'Garurt', 'Hsiska', 'Kriv', 'Mirik', 'Othokent', 'Shedinn', 'Sorassa', 'Throden', 'Usk', 'Vutha'],
      last: ['Blackscale', 'Ironclaw', 'Swiftswimmer', 'Stonehide', 'Coldfang', 'Mudwalker', 'Marshborn', 'Riverspear', 'Thicktail', 'Deepwater']
    },
    Triton: {
      first: ['Corus', 'Delnis', 'Jhimas', 'Keros', 'Molos', 'Nalos', 'Vodos', 'Zunis', 'Aryn', 'Belthyn', 'Duthyn', 'Feloren', 'Otanyn', 'Shalryn'],
      last: ['Ahlorsath', 'Pumanath', 'Vuuvaxath', 'Marirath', 'Corapath', 'Ilishath', 'Meridath', 'Urunath', 'Acelath', 'Deshalth']
    },
    Aasimar: {
      first: ['Arken', 'Ariel', 'Dara', 'Gideon', 'Lariel', 'Melech', 'Nirah', 'Oriel', 'Pheriel', 'Thariel', 'Zachariel', 'Auriel', 'Cassiel', 'Dariel'],
      last: ['Lightbringer', 'Dawnheart', 'Celestial', 'Holyfire', 'Goldwing', 'Starborn', 'Radiantheart', 'Divineshield', 'Faithkeeper', 'Gracewing']
    }
  };



  const generateName = (race) => {
    const names = namesByRace[race];
    const firstName = names.first[Math.floor(Math.random() * names.first.length)];
    const lastName = names.last[Math.floor(Math.random() * names.last.length)];
    return `${firstName} ${lastName}`;
  };

  const rollStats = () => {
    const rollDice = () => {
      const rolls = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
      ].sort((a, b) => b - a);
      return rolls[0] + rolls[1] + rolls[2]; // Drop lowest
    };

    return {
      strength: rollDice(),
      dexterity: rollDice(),
      constitution: rollDice(),
      intelligence: rollDice(),
      wisdom: rollDice(),
      charisma: rollDice()
    };
  };

  const generateAIContent = async (name, race, charClass, level, alignment, background, stats) => {
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1500,
          messages: [
            {
              role: "user",
              content: `You are a creative D&D storyteller. Generate content for this character:

Name: ${name}
Race: ${race}
Class: ${charClass}
Level: ${level}
Alignment: ${alignment}
Background: ${background}
Stats: STR ${stats.strength}, DEX ${stats.dexterity}, CON ${stats.constitution}, INT ${stats.intelligence}, WIS ${stats.wisdom}, CHA ${stats.charisma}

Generate the following in JSON format:
{
  "backstory": "2-3 compelling sentences with specific details about their past",
  "trait": "A unique, specific personality quirk or mannerism (be creative and original, never generic)",
  "equipment": ["item1", "item2", "item3", "item4", "item5"],
  "voiceAccent": "A creative description of how they speak (1 sentence)",
  "portrait": "A detailed visual description for AI art generation (2 sentences, be specific about appearance, clothing, pose, and mood)"
}

IMPORTANT: Make the personality trait completely unique and specific. Avoid generic traits. Think of unusual quirks, specific habits, or distinctive mannerisms that make this character memorable. Examples of good traits: "Collects buttons from every city they visit and sews them onto their cloak", "Refuses to make eye contact when lying, always looks at people's feet", "Hums sea shanties when nervous, even if they've never been to sea".

Make the backstory dramatic and incorporate their alignment, background, and stats. List 5 appropriate equipment items for their class and level. The voice/accent should match their background and personality. The portrait description should be vivid and specific.

Respond ONLY with valid JSON, no other text.`
            }
          ],
        })
      });

      const data = await response.json();
      const text = data.content
        .filter(item => item.type === "text")
        .map(item => item.text)
        .join("\n")
        .trim();
      
      // Clean JSON formatting
      const cleanText = text.replace(/```json\n?|```\n?/g, '').trim();
      const parsed = JSON.parse(cleanText);
      
      return parsed;
    } catch (error) {
      console.error("Error generating content:", error);
      return {
        backstory: "A mysterious figure whose past remains shrouded in shadow, seeking purpose in a world full of danger and opportunity.",
        trait: "Has a habit of overthinking simple decisions while making snap judgments on complex matters.",
        equipment: ["Backpack", "Bedroll", "Rations (5 days)", "Waterskin", "Rope (50 ft)"],
        voiceAccent: "Speaks with confidence and clarity.",
        portrait: "A determined adventurer standing ready for action. Their equipment is well-maintained and their posture suggests experience."
      };
    }
  };

  const generateCharacter = async () => {
    setGenerating(true);
    
    const race = selectedRace === 'random' 
      ? races[Math.floor(Math.random() * races.length)]
      : selectedRace;
    
    const charClass = selectedClass === 'random'
      ? classes[Math.floor(Math.random() * classes.length)]
      : selectedClass;

    const level = parseInt(selectedLevel);
    const alignment = alignments[Math.floor(Math.random() * alignments.length)];
    const background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    const name = generateName(race);
    const stats = rollStats();

    // Set character immediately with loading state
    setCharacter({
      name,
      race,
      class: charClass,
      level,
      alignment,
      background,
      stats,
      backstory: "Conjuring your character's tale...",
      equipment: [],
      voiceAccent: "Determining voice...",
      portrait: "Envisioning appearance...",
      trait: "Discovering personality...",
      loading: true
    });

    setGenerating(false);

    // Generate AI content in background
    const aiContent = await generateAIContent(name, race, charClass, level, alignment, background, stats);
    
    setCharacter({
      name,
      race,
      class: charClass,
      level,
      alignment,
      background,
      stats,
      backstory: aiContent.backstory,
      equipment: aiContent.equipment,
      voiceAccent: aiContent.voiceAccent,
      portrait: aiContent.portrait,
      trait: aiContent.trait,
      loading: false
    });
  };

  const copyToClipboard = () => {
    if (!character) return;
    
    const text = `${character.name}
Level ${character.level} ${character.race} ${character.class}
${character.alignment} • ${character.background}

STATS:
STR ${character.stats.strength} | DEX ${character.stats.dexterity} | CON ${character.stats.constitution}
INT ${character.stats.intelligence} | WIS ${character.stats.wisdom} | CHA ${character.stats.charisma}

BACKSTORY:
${character.backstory}

PERSONALITY:
${character.trait}

VOICE:
${character.voiceAccent}

EQUIPMENT:
${character.equipment.map(item => `• ${item}`).join('\n')}

APPEARANCE:
${character.portrait}`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const regenerateName = () => {
    if (!character) return;
    setCharacter({
      ...character,
      name: generateName(character.race)
    });
  };

  const regenerateStats = () => {
    if (!character) return;
    setCharacter({
      ...character,
      stats: rollStats()
    });
  };

  const regenerateContent = async () => {
    if (!character) return;
    
    setCharacter({
      ...character,
      backstory: "Conjuring new tale...",
      equipment: [],
      voiceAccent: "Determining voice...",
      portrait: "Envisioning appearance...",
      trait: "Discovering personality...",
      loading: true
    });

    const aiContent = await generateAIContent(
      character.name,
      character.race,
      character.class,
      character.level,
      character.alignment,
      character.background,
      character.stats
    );
    
    setCharacter({
      ...character,
      backstory: aiContent.backstory,
      equipment: aiContent.equipment,
      voiceAccent: aiContent.voiceAccent,
      portrait: aiContent.portrait,
      trait: aiContent.trait,
      loading: false
    });
  };

  const getModifier = (stat) => {
    return Math.floor((stat - 10) / 2);
  };

  const formatModifier = (mod) => {
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Wand2 className="text-purple-400" size={32} />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 via-orange-300 to-amber-400 bg-clip-text text-transparent">
              D&D Character Generator
            </h1>
          </div>
          <p className="text-purple-300 text-lg">Complete Character Builder • Powered by AI</p>
          <p className="text-purple-400 text-sm mt-1">Stats, Equipment, Voice & More</p>
        </div>

        {/* Controls */}
        <div className="bg-black/30 backdrop-blur-md rounded-lg p-6 mb-6 border border-purple-500/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-purple-300">Race</label>
              <select 
                value={selectedRace}
                onChange={(e) => setSelectedRace(e.target.value)}
                className="w-full bg-slate-800 border border-purple-500/50 rounded px-4 py-2 text-white focus:outline-none focus:border-purple-400"
              >
                <option value="random">Random</option>
                {races.map(race => (
                  <option key={race} value={race}>{race}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-purple-300">Class</label>
              <select 
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full bg-slate-800 border border-purple-500/50 rounded px-4 py-2 text-white focus:outline-none focus:border-purple-400"
              >
                <option value="random">Random</option>
                {classes.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-purple-300">Level</label>
              <select 
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full bg-slate-800 border border-purple-500/50 rounded px-4 py-2 text-white focus:outline-none focus:border-purple-400"
              >
                {[...Array(20)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={generateCharacter}
            disabled={generating}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {generating ? (
              <>
                <RefreshCw className="animate-spin" size={20} />
                Generating...
              </>
            ) : (
              <>
                <Dice6 size={20} />
                Generate Character
              </>
            )}
          </button>
        </div>

        {/* Character Card */}
        {character && (
          <div className="space-y-4">
            {/* Header Section */}
            <div className="bg-black/40 backdrop-blur-md rounded-lg p-6 border border-amber-500/30 shadow-2xl">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-4xl font-bold text-amber-400">{character.name}</h2>
                    <button
                      onClick={regenerateName}
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                      title="Regenerate name"
                    >
                      <RefreshCw size={18} />
                    </button>
                  </div>
                  <p className="text-2xl text-purple-300 mb-2">
                    Level {character.level} {character.race} {character.class}
                  </p>
                  <div className="flex gap-3 text-sm">
                    <span className="px-3 py-1 bg-purple-600/30 rounded-full border border-purple-400/50">
                      {character.alignment}
                    </span>
                    <span className="px-3 py-1 bg-amber-600/30 rounded-full border border-amber-400/50">
                      {character.background}
                    </span>
                  </div>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="bg-slate-700 hover:bg-slate-600 p-2 rounded-lg transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
                </button>
              </div>
            </div>

            {/* Stats Section */}
            <div className="bg-black/40 backdrop-blur-md rounded-lg p-6 border border-purple-500/30">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sword className="text-amber-400" size={20} />
                  <h3 className="text-xl font-semibold text-amber-300">Ability Scores</h3>
                </div>
                <button
                  onClick={regenerateStats}
                  className="text-purple-400 hover:text-purple-300 transition-colors text-sm flex items-center gap-1"
                  title="Reroll stats"
                >
                  <RefreshCw size={16} />
                  Reroll
                </button>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {Object.entries(character.stats).map(([stat, value]) => (
                  <div key={stat} className="text-center bg-slate-800/50 rounded-lg p-3 border border-purple-500/30">
                    <div className="text-xs uppercase text-purple-300 mb-1">
                      {stat.substring(0, 3)}
                    </div>
                    <div className="text-2xl font-bold text-white">{value}</div>
                    <div className="text-sm text-amber-400">
                      {formatModifier(getModifier(value))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Story Section */}
              <div className="bg-black/40 backdrop-blur-md rounded-lg p-6 border border-purple-500/30">
                <div className="flex items-start gap-2 mb-3">
                  <Scroll className="text-amber-400 mt-1" size={20} />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-amber-300">Backstory</h3>
                  </div>
                  <button
                    onClick={regenerateContent}
                    disabled={character.loading}
                    className="text-purple-400 hover:text-purple-300 transition-colors disabled:opacity-50"
                    title="Regenerate content"
                  >
                    <RefreshCw size={16} className={character.loading ? "animate-spin" : ""} />
                  </button>
                </div>
                <p className={`text-gray-300 mb-4 leading-relaxed ${character.loading ? 'italic opacity-70' : ''}`}>
                  {character.backstory}
                </p>
                
                <h4 className="text-lg font-semibold text-amber-300 mb-2">Personality</h4>
                <p className="text-gray-300 italic mb-4">"{character.trait}"</p>
                
                <h4 className="text-lg font-semibold text-amber-300 mb-2">Voice & Accent</h4>
                <p className={`text-gray-300 ${character.loading ? 'italic opacity-70' : ''}`}>
                  {character.voiceAccent}
                </p>
              </div>

              {/* Equipment & Appearance */}
              <div className="space-y-4">
                {/* Equipment */}
                <div className="bg-black/40 backdrop-blur-md rounded-lg p-6 border border-purple-500/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="text-amber-400" size={20} />
                    <h3 className="text-xl font-semibold text-amber-300">Equipment</h3>
                  </div>
                  {character.loading ? (
                    <p className="text-gray-300 italic opacity-70">Gathering equipment...</p>
                  ) : (
                    <ul className="space-y-2">
                      {character.equipment.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-300">
                          <span className="text-purple-400 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Appearance */}
                <div className="bg-black/40 backdrop-blur-md rounded-lg p-6 border border-purple-500/30">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="text-amber-400" size={20} />
                    <h3 className="text-xl font-semibold text-amber-300">Appearance</h3>
                  </div>
                  <p className={`text-gray-300 leading-relaxed ${character.loading ? 'italic opacity-70' : ''}`}>
                    {character.portrait}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-md rounded-lg p-4 border border-purple-500/30 flex items-center justify-center gap-2 text-sm text-purple-400">
              <Sparkles size={16} />
              <span>AI-Generated • Completely Unique • Ready to Play</span>
            </div>
          </div>
        )}

        {/* Initial State */}
        {!character && (
          <div className="text-center py-16 text-purple-300">
            <Dice6 size={64} className="mx-auto mb-4 opacity-50" />
            <p className="text-xl mb-2">Roll the dice to create your character</p>
            <p className="text-sm text-purple-400">Complete with stats, equipment, voice, and appearance</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DnDGenerator;
