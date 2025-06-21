import { AlphabetInfo, WordInfo, ChapterInfo, QuizQuestion, QuestionType, SentenceInfo, ParagraphInfo, StoryInfo, MCQOption, ReviewSectionInfo, ExamInfo } from './types';

export const UYIR_EZHUTHUKKAL: AlphabetInfo[] = [
  { tamil: 'அ', transliteration: 'a', type: 'vowel', soundExample: 'as in "america"', audioSrc: 'audio/alphabets/a.mp3' },
  { tamil: 'ஆ', transliteration: 'aa', type: 'vowel', soundExample: 'as in "father"', audioSrc: 'audio/alphabets/aa.mp3' },
  { tamil: 'இ', transliteration: 'i', type: 'vowel', soundExample: 'as in "india"', audioSrc: 'audio/alphabets/i.mp3' },
  { tamil: 'ஈ', transliteration: 'ee', type: 'vowel', soundExample: 'as in "bee"', audioSrc: 'audio/alphabets/ii.mp3' },
  { tamil: 'உ', transliteration: 'u', type: 'vowel', soundExample: 'as in "put"', audioSrc: 'audio/alphabets/u.mp3' },
  { tamil: 'ஊ', transliteration: 'oo', type: 'vowel', soundExample: 'as in "moon"', audioSrc: 'audio/alphabets/uu.mp3' },
  { tamil: 'எ', transliteration: 'e', type: 'vowel', soundExample: 'as in "get"', audioSrc: 'audio/alphabets/e_short.mp3' },
  { tamil: 'ஏ', transliteration: 'ae', type: 'vowel', soundExample: 'as in "ate"', audioSrc: 'audio/alphabets/e_long.mp3' },
  { tamil: 'ஐ', transliteration: 'ai', type: 'vowel', soundExample: 'as in "ice"', audioSrc: 'audio/alphabets/ai.mp3' },
  { tamil: 'ஒ', transliteration: 'o', type: 'vowel', soundExample: 'as in "go" (short)', audioSrc: 'audio/alphabets/o_short.mp3' },
  { tamil: 'ஓ', transliteration: 'oa', type: 'vowel', soundExample: 'as in "goat"', audioSrc: 'audio/alphabets/o_long.mp3' },
  { tamil: 'ஔ', transliteration: 'au', type: 'vowel', soundExample: 'as in "ouch"', audioSrc: 'audio/alphabets/au.mp3' },
];

export const MEI_EZHUTHUKKAL: AlphabetInfo[] = [
  { tamil: 'க்', transliteration: 'ik', type: 'consonant', audioSrc: 'audio/alphabets/ik.mp3' },
  { tamil: 'ங்', transliteration: 'ing', type: 'consonant', audioSrc: 'audio/alphabets/ing_soft.mp3' },
  { tamil: 'ச்', transliteration: 'ich', type: 'consonant', audioSrc: 'audio/alphabets/ich.mp3' },
  { tamil: 'ஞ்', transliteration: 'inj', type: 'consonant', audioSrc: 'audio/alphabets/inj.mp3' },
  { tamil: 'ட்', transliteration: 'it', type: 'consonant', audioSrc: 'audio/alphabets/it_retroflex.mp3' },
  { tamil: 'ண்', transliteration: 'in (retroflex)', type: 'consonant', audioSrc: 'audio/alphabets/in_retroflex.mp3' },
  { tamil: 'த்', transliteration: 'ith', type: 'consonant', audioSrc: 'audio/alphabets/ith_dental.mp3' },
  { tamil: 'ந்', transliteration: 'indh', type: 'consonant', audioSrc: 'audio/alphabets/indh_dental.mp3' },
  { tamil: 'ப்', transliteration: 'ip', type: 'consonant', audioSrc: 'audio/alphabets/ip.mp3' },
  { tamil: 'ம்', transliteration: 'im', type: 'consonant', audioSrc: 'audio/alphabets/im.mp3' },
  { tamil: 'ய்', transliteration: 'iy', type: 'consonant', audioSrc: 'audio/alphabets/iy.mp3' },
  { tamil: 'ர்', transliteration: 'ir', type: 'consonant', audioSrc: 'audio/alphabets/ir_trill.mp3' },
  { tamil: 'ல்', transliteration: 'il', type: 'consonant', audioSrc: 'audio/alphabets/il_dental.mp3' },
  { tamil: 'வ்', transliteration: 'iv', type: 'consonant', audioSrc: 'audio/alphabets/iv.mp3' },
  { tamil: 'ழ்', transliteration: 'izh', type: 'consonant', audioSrc: 'audio/alphabets/izh.mp3' },
  { tamil: 'ள்', transliteration: 'il (retroflex)', type: 'consonant', audioSrc: 'audio/alphabets/il_retroflex.mp3' },
  { tamil: 'ற்', transliteration: 'itr', type: 'consonant', audioSrc: 'audio/alphabets/itr_alveolar.mp3' },
  { tamil: 'ன்', transliteration: 'in (alveolar)', type: 'consonant', audioSrc: 'audio/alphabets/in_alveolar.mp3' },
];

export const AAYUTHA_EZHUTHU: AlphabetInfo = {
  tamil: 'ஃ',
  transliteration: 'akh',
  type: 'aayutham',
  soundExample: 'a special character',
  audioSrc: 'audio/alphabets/akh.mp3'
};

export const ALL_ALPHABETS = [...UYIR_EZHUTHUKKAL, ...MEI_EZHUTHUKKAL, AAYUTHA_EZHUTHU];

const ALPHABET_CONCEPTS: ParagraphInfo[] = [
  {
    id: 'ac1',
    title: 'உயிர் எழுத்து வகைகள் (Types of Vowels)',
    tamil: `தமிழ் உயிர் எழுத்துக்கள் இரண்டு வகைப்படும்:\n1. குறில் (Kuril): அ, இ, உ, எ, ஒ.\n2. நெடில் (Nedil): ஆ, ஈ, ஊ, ஏ, ஐ, ஓ, ஔ.`,
    meaning: 'Tamil vowels are of two types:\n1. Kuril: Short vowels (அ, இ, உ, எ, ஒ).\n2. Nedil: Long vowels (ஆ, ஈ, ஊ, ஏ, ஐ, ஓ, ஔ).'
  },
  {
    id: 'ac2',
    title: 'மெய் எழுத்து வகைகள் (Types of Consonants)',
    tamil: `தமிழ் மெய் எழுத்துக்கள் மூன்று வகைப்படும்:\n1. வல்லினம் (Vallinam): க், ச், ட், த், ப், ற்\n2. மெல்லினம் (Mellinam): ங், ஞ், ண், ந், ம், ன்\n3. இடையினம் (Idaiyinam): ய், ர், ல், வ், ழ், ள்`,
    meaning: 'Tamil consonants are of three types:\n1. Vallinam: Hard consonants\n2. Mellinam: Soft/Nasal consonants\n3. Idaiyinam: Medium consonants'
  },
  {
    id: 'ac3',
    title: 'உயிர்மெய் எழுத்துக்கள் (Vowel-Consonants)',
    tamil: `உயிர் எழுத்துக்களும் மெய் எழுத்துக்களும் சேர்ந்து உயிர்மெய் எழுத்துக்கள் உருவாகின்றன. (எ.கா: க் + அ = க).\nமொத்தம் 216 உயிர்மெய் எழுத்துக்கள் உள்ளன.`,
    meaning: 'Vowel-consonants are formed by vowels and consonants. (e.g., க் + அ = க).\nTotal: 216 vowel-consonants.'
  },
  {
    id: 'ac4',
    title: 'தமிழ் எழுத்துக்களின் தொகை (Total Count of Tamil Letters)',
    tamil: `உயிர்: 12, மெய்: 18, உயிர்மெய்: 216, ஆய்தம்: 1. மொத்தம்: 247.`,
    meaning: 'Vowels: 12, Consonants: 18, Vowel-Consonants: 216, Aayutham: 1. Total: 247.'
  }
];

export const COLORS_WORDS: WordInfo[] = [
  { tamil: 'சிவப்பு', transliteration: 'sivappu', meaning: 'Red', category: 'simple', audioSrc: 'audio/words/sivappu.mp3' },
  { tamil: 'பச்சை', transliteration: 'pachchai', meaning: 'Green', category: 'simple', audioSrc: 'audio/words/pachchai.mp3' },
  { tamil: 'மஞ்சள்', transliteration: 'manjal', meaning: 'Yellow', category: 'simple', audioSrc: 'audio/words/manjal.mp3' },
  { tamil: 'கருப்பு', transliteration: 'karuppu', meaning: 'Black', category: 'simple', audioSrc: 'audio/words/karuppu.mp3' },
  { tamil: 'வெள்ளை', transliteration: 'vellai', meaning: 'White', category: 'simple', audioSrc: 'audio/words/vellai.mp3' },
  { tamil: 'நீலம்', transliteration: 'neelam', meaning: 'Blue', category: 'simple', audioSrc: 'audio/words/neelam.mp3' },
];

export const FRUITS_WORDS: WordInfo[] = [
  { tamil: 'மாம்பழம்', transliteration: 'maampazham', meaning: 'Mango', category: 'simple', audioSrc: 'audio/words/maampazham.mp3' },
  { tamil: 'வாழைப்பழம்', transliteration: 'vaazhaippazham', meaning: 'Banana', category: 'complex', audioSrc: 'audio/words/vaazhaippazham.mp3' },
  { tamil: 'பலாப்பழம்', transliteration: 'palaappazham', meaning: 'Jackfruit', category: 'complex', audioSrc: 'audio/words/palaappazham.mp3' },
  { tamil: 'திராட்சைப்பழம்', transliteration: 'thiraatchaippazham', meaning: 'Grapes', category: 'complex', audioSrc: 'audio/words/thiraatchai.mp3' },
  { tamil: 'கொய்யாப்பழம்', transliteration: 'koiyaappazham', meaning: 'Guava', category: 'simple', audioSrc: 'audio/words/koiyaappazham.mp3' },
  { tamil: 'ஆப்பிள்', transliteration: 'aappil', meaning: 'Apple', category: 'simple', audioSrc: 'audio/words/aappil.mp3' },
  { tamil: 'அன்னாசிப்பழம்', transliteration: 'annaasippazham', meaning: 'Pineapple', category: 'complex', audioSrc: 'audio/words/annaasippazham.mp3'},
  { tamil: 'தர்பூசணி', transliteration: 'tharpoosani', meaning: 'Watermelon', category: 'complex', audioSrc: 'audio/words/tharpoosani.mp3'},
];

export const ANIMALS_WORDS: WordInfo[] = [
  { tamil: 'நாய்', transliteration: 'naai', meaning: 'Dog', category: 'simple', audioSrc: 'audio/words/naai.mp3' },
  { tamil: 'பூனை', transliteration: 'poonai', meaning: 'Cat', category: 'simple', audioSrc: 'audio/words/poonai.mp3' },
  { tamil: 'யானை', transliteration: 'yaanai', meaning: 'Elephant', category: 'simple', audioSrc: 'audio/words/yaanai.mp3' },
  { tamil: 'குதிரை', transliteration: 'kuthirai', meaning: 'Horse', category: 'simple', audioSrc: 'audio/words/kuthirai.mp3' },
  { tamil: 'சிங்கம்', transliteration: 'singam', meaning: 'Lion', category: 'simple', audioSrc: 'audio/words/singam.mp3' },
  { tamil: 'புலி', transliteration: 'puli', meaning: 'Tiger', category: 'simple', audioSrc: 'audio/words/puli.mp3'},
  { tamil: 'மான்', transliteration: 'maan', meaning: 'Deer', category: 'simple', audioSrc: 'audio/words/maan.mp3'},
  { tamil: 'பசு', transliteration: 'pasu', meaning: 'Cow', category: 'simple', audioSrc: 'audio/words/pasu.mp3'},
  { tamil: 'ஆடு', transliteration: 'aadu', meaning: 'Goat', category: 'simple', audioSrc: 'audio/words/aadu.mp3'},
  { tamil: 'கரடி', transliteration: 'karadi', meaning: 'Bear', category: 'simple', audioSrc: 'audio/words/karadi.mp3'},
];

export const BIRDS_WORDS: WordInfo[] = [
    { tamil: 'மயில்', transliteration: 'mayil', meaning: 'Peacock', category: 'simple', audioSrc: 'audio/words/mayil.mp3'},
    { tamil: 'கிளி', transliteration: 'kili', meaning: 'Parrot', category: 'simple', audioSrc: 'audio/words/kili.mp3'},
    { tamil: 'காகம்', transliteration: 'kaagam', meaning: 'Crow', category: 'simple', audioSrc: 'audio/words/kaagam.mp3'},
    { tamil: 'புறா', transliteration: 'puraa', meaning: 'Pigeon', category: 'simple', audioSrc: 'audio/words/puraa.mp3'},
    { tamil: 'வாத்து', transliteration: 'vaaththu', meaning: 'Duck', category: 'simple', audioSrc: 'audio/words/vaaththu.mp3'},
    { tamil: 'கோழி', transliteration: 'kozhi', meaning: 'Hen/Chicken', category: 'simple', audioSrc: 'audio/words/kozhi.mp3'},
];


export const NUMBERS_WORDS: WordInfo[] = [
  { tamil: 'ஒன்று', transliteration: 'ondru', meaning: 'One (1)', category: 'simple', audioSrc: 'audio/words/ondru.mp3' },
  { tamil: 'இரண்டு', transliteration: 'irandu', meaning: 'Two (2)', category: 'simple', audioSrc: 'audio/words/irandu.mp3' },
  { tamil: 'மூன்று', transliteration: 'moondru', meaning: 'Three (3)', category: 'simple', audioSrc: 'audio/words/moondru.mp3' },
  { tamil: 'நான்கு', transliteration: 'naangu', meaning: 'Four (4)', category: 'simple', audioSrc: 'audio/words/naangu.mp3' },
  { tamil: 'ஐந்து', transliteration: 'aindhu', meaning: 'Five (5)', category: 'simple', audioSrc: 'audio/words/aindhu.mp3' },
  { tamil: 'ஆறு', transliteration: 'aaru', meaning: 'Six (6)', category: 'simple', audioSrc: 'audio/words/aaru.mp3' },
  { tamil: 'ஏழு', transliteration: 'ezhu', meaning: 'Seven (7)', category: 'simple', audioSrc: 'audio/words/ezhu.mp3' },
  { tamil: 'எட்டு', transliteration: 'ettu', meaning: 'Eight (8)', category: 'simple', audioSrc: 'audio/words/ettu.mp3' },
  { tamil: 'ஒன்பது', transliteration: 'onpathu', meaning: 'Nine (9)', category: 'simple', audioSrc: 'audio/words/onbathu.mp3' },
  { tamil: 'பத்து', transliteration: 'paththu', meaning: 'Ten (10)', category: 'simple', audioSrc: 'audio/words/paththu.mp3' },
];

export const FAMILY_WORDS: WordInfo[] = [
  { tamil: 'அம்மா', transliteration: 'ammaa', meaning: 'Mother', category: 'simple', audioSrc: 'audio/words/ammaa.mp3' },
  { tamil: 'அப்பா', transliteration: 'appaa', meaning: 'Father', category: 'simple', audioSrc: 'audio/words/appaa.mp3' },
  { tamil: 'தாத்தா', transliteration: 'thaaththaa', meaning: 'Grandfather', category: 'simple', audioSrc: 'audio/words/thaaththaa.mp3' },
  { tamil: 'பாட்டி', transliteration: 'paatti', meaning: 'Grandmother', category: 'simple', audioSrc: 'audio/words/paatti.mp3' },
  { tamil: 'அண்ணன்', transliteration: 'annan', meaning: 'Elder brother', category: 'simple', audioSrc: 'audio/words/annan.mp3' },
  { tamil: 'தம்பி', transliteration: 'thambi', meaning: 'Younger brother', category: 'simple', audioSrc: 'audio/words/thambi.mp3' },
  { tamil: 'அக்கா', transliteration: 'akkaa', meaning: 'Elder sister', category: 'simple', audioSrc: 'audio/words/akkaa.mp3' },
  { tamil: 'தங்கை', transliteration: 'thangai', meaning: 'Younger sister', category: 'simple', audioSrc: 'audio/words/thangai.mp3' },
];

export const DAYS_WORDS: WordInfo[] = [
  { tamil: 'ஞாயிறு', transliteration: 'Gnayiru', meaning: 'Sunday', category: 'simple', audioSrc: 'audio/words/gnayiru.mp3' },
  { tamil: 'திங்கள்', transliteration: 'Thingal', meaning: 'Monday', category: 'simple', audioSrc: 'audio/words/thingal.mp3' },
  { tamil: 'செவ்வாய்', transliteration: 'Sevvaai', meaning: 'Tuesday', category: 'simple', audioSrc: 'audio/words/sevvaai.mp3' },
  { tamil: 'புதன்', transliteration: 'Puthan', meaning: 'Wednesday', category: 'simple', audioSrc: 'audio/words/puthan.mp3' },
  { tamil: 'வியாழன்', transliteration: 'Viyaazhan', meaning: 'Thursday', category: 'simple', audioSrc: 'audio/words/viyaazhan.mp3' },
  { tamil: 'வெள்ளி', transliteration: 'Velli', meaning: 'Friday', category: 'simple', audioSrc: 'audio/words/velli.mp3' },
  { tamil: 'சனி', transliteration: 'Sani', meaning: 'Saturday', category: 'simple', audioSrc: 'audio/words/sani.mp3' },
];

export const IMAGE3_WORDS: WordInfo[] = [
    { tamil: 'அணில்', transliteration: 'anil', meaning: 'Squirrel', category: 'simple', audioSrc: 'audio/words/anil.mp3' },
    { tamil: 'ஆடு', transliteration: 'aadu', meaning: 'Goat', category: 'simple', audioSrc: 'audio/words/aadu.mp3' },
    { tamil: 'இலை', transliteration: 'ilai', meaning: 'Leaf', category: 'simple', audioSrc: 'audio/words/ilai.mp3' },
    { tamil: 'ஈட்டி', transliteration: 'eetti', meaning: 'Spear', category: 'simple', audioSrc: 'audio/words/eetti.mp3' },
    { tamil: 'உலக்கை', transliteration: 'ulakkai', meaning: 'Pestle', category: 'simple', audioSrc: 'audio/words/ulakkai.mp3' },
    { tamil: 'ஊஞ்சல்', transliteration: 'oonjal', meaning: 'Swing', category: 'simple', audioSrc: 'audio/words/oonjal.mp3' },
    { tamil: 'எறும்பு', transliteration: 'erumbu', meaning: 'Ant', category: 'simple', audioSrc: 'audio/words/erumbu.mp3' },
    { tamil: 'ஏணி', transliteration: 'aeni', meaning: 'Ladder', category: 'simple', audioSrc: 'audio/words/aeni.mp3' },
    { tamil: 'ஐவர்', transliteration: 'aivar', meaning: 'Five persons', category: 'simple', audioSrc: 'audio/words/aivar.mp3' },
    { tamil: 'ஒட்டகம்', transliteration: 'ottagam', meaning: 'Camel', category: 'simple', audioSrc: 'audio/words/ottagam.mp3' },
    { tamil: 'ஓடம்', transliteration: 'oadam', meaning: 'Boat', category: 'simple', audioSrc: 'audio/words/oadam.mp3' },
    { tamil: 'ஔடதம்', transliteration: 'audatham', meaning: 'Medicine', category: 'simple', audioSrc: 'audio/words/audatham.mp3' },
    { tamil: 'பந்து', transliteration: 'pandhu', meaning: 'Ball', category: 'simple', audioSrc: 'audio/words/pandhu.mp3' },
    { tamil: 'சங்கு', transliteration: 'sangu', meaning: 'Conch', category: 'simple', audioSrc: 'audio/words/sangu.mp3' },
    { tamil: 'தச்சன்', transliteration: 'thachchan', meaning: 'Carpenter', category: 'simple', audioSrc: 'audio/words/thachchan.mp3' },
    { tamil: 'மஞ்சள்', transliteration: 'manjal', meaning: 'Turmeric/Yellow', category: 'simple', audioSrc: 'audio/words/manjal.mp3' },
    { tamil: 'வட்டம்', transliteration: 'vattam', meaning: 'Circle', category: 'simple', audioSrc: 'audio/words/vattam.mp3' },
    { tamil: 'பணம்', transliteration: 'panam', meaning: 'Money', category: 'simple', audioSrc: 'audio/words/panam.mp3' },
    { tamil: 'கப்பல்', transliteration: 'kappal', meaning: 'Ship', category: 'simple', audioSrc: 'audio/words/kappal.mp3' },
    { tamil: 'செவ்வந்தி', transliteration: 'sevvanthi', meaning: 'Chrysanthemum', category: 'complex', audioSrc: 'audio/words/sevvanthi.mp3' },
    { tamil: 'வாத்து', transliteration: 'vaaththu', meaning: 'Duck', category: 'simple', audioSrc: 'audio/words/vaaththu.mp3' },
    { tamil: 'காக்கை', transliteration: 'kaakkai', meaning: 'Crow', category: 'simple', audioSrc: 'audio/words/kaakkai.mp3' },
];

const ALL_IMAGE_WORDS = [
    ...COLORS_WORDS, ...FRUITS_WORDS, ...ANIMALS_WORDS, ...BIRDS_WORDS,
    ...NUMBERS_WORDS, ...FAMILY_WORDS, ...DAYS_WORDS, ...IMAGE3_WORDS
].filter((word, index, self) => index === self.findIndex((t) => t.tamil === word.tamil)); // Deduplicate

export const BASIC_WORDS: WordInfo[] = ALL_IMAGE_WORDS.filter(w => w.category === 'simple').slice(0, 10);
export const COMPLEX_WORDS: WordInfo[] = ALL_IMAGE_WORDS.filter(w => w.category === 'complex').slice(0, 5);


export const ENNAI_PATRI_SENTENCES: SentenceInfo[] = [
  { id: 'ep1', tamil: 'என் பெயர் ______.', meaning: 'My name is ______.' },
  { id: 'ep2', tamil: 'என்னுடைய வயது _____.', meaning: 'My age is _____.' },
  { id: 'ep3', tamil: 'நான் பிறந்த இடம் ______.', meaning: 'The place I was born is ______.' },
  { id: 'ep4', tamil: 'நான் படிக்கும் வகுப்பு ______.', meaning: 'The class I study in is ______.' },
  { id: 'ep5', tamil: 'என் அப்பாவின் பெயர் ______.', meaning: 'My father\'s name is ______.' },
  { id: 'ep6', tamil: 'என் அம்மாவின் பெயர் ______.', meaning: 'My mother\'s name is ______.' },
  { id: 'ep7', tamil: 'என் பள்ளியின் பெயர் ______ ______.', meaning: 'My school\'s name is ______ ______.' },
];

export const NIRAPPUGA_SENTENCES: SentenceInfo[] = [
  { id: 'ns1', tamil: 'சூரியன் காலையில் உதிக்கிறது.', meaning: 'The sun rises in the morning.' },
  { id: 'ns2', tamil: 'சூரியன் உதிக்கும் திசை கிழக்கு.', meaning: 'The direction the sun rises is East.' },
  { id: 'ns3', tamil: 'சூரியன் மாலையில் மறைகிறது.', meaning: 'The sun sets in the evening.' },
  { id: 'ns4', tamil: 'சூரியன் மறையும் திசை மேற்கு.', meaning: 'The direction the sun sets is West.' },
  { id: 'ns5', 'tamil': 'மரத்தில் ஒரு வகை விலங்கு குரங்கு.', 'meaning': 'One type of animal on a tree is a monkey.' },
  { id: 'ns6', tamil: 'தும்பிக்கை உடைய விலங்கு யானை.', meaning: 'An animal with a trunk is elephant.' },
  { id: 'ns7', tamil: 'நீரில் வாழும் விலங்குகள் ஒன்று மீன்.', meaning: 'One of the animals living in water is fish.'},
  { id: 'ns8', tamil: 'காட்டில் வாழும் விலங்கு புலி.', meaning: 'An animal living in the forest is tiger.'},
];

export const AATHICHOODI_SENTENCES: SentenceInfo[] = [
  { id: 'aa1', tamil: 'அறம் செய விரும்பு.', meaning: 'Desire to do virtuous deeds.' },
  { id: 'aa2', tamil: 'ஆறுவது சினம்.', meaning: 'Anger subsides / Control your anger.' },
  { id: 'aa3', tamil: 'இயல்வது கரவேல்.', meaning: 'Don\'t stop learning what is learnable / Don\'t hide what you can give.' },
  { id: 'aa4', tamil: 'ஈவது விலக்கேல்.', meaning: 'Do not stop giving (charity).'},
  { id: 'aa5', tamil: 'உடையது விளம்பேல்.', meaning: 'Do not boast about your possessions.'},
  { id: 'aa6', tamil: 'ஊக்கமது கைவிடேல்.', meaning: 'Don\'t give up your enthusiasm/perseverance.' },
  { id: 'aa7', tamil: 'எண் எழுத்து இகழேல்.', meaning: 'Do not despise numbers and letters (learning).'},
  { id: 'aa8', tamil: 'ஏற்பது இகழ்ச்சி.', meaning: 'Begging is a disgrace.'},
];

export const SIMPLE_SENTENCES: SentenceInfo[] = [
  { id: 'sent1', tamil: 'இது ஒரு புத்தகம்.', transliteration: 'Idhu oru puththagam.', meaning: 'This is a book.' },
  ...NIRAPPUGA_SENTENCES.slice(0,1),
];

export const SIMPLE_PARAGRAPH: ParagraphInfo = {
  id: 'para1',
  title: 'என் பள்ளி (My School)',
  tamil: 'என் பெயர் குமரன். நான் தினமும் பள்ளிக்கு செல்வேன்.',
  meaning: 'My name is Kumaran. I go to school daily.'
};

export const AATHICHOODI_PARAGRAPH: ParagraphInfo = {
  id: 'aathichoodi_para',
  title: 'ஆத்திசூடி (Aathichoodi)',
  tamil: AATHICHOODI_SENTENCES.map(s => s.tamil).join('\n'),
  meaning: 'A collection of single-line quotations by Avvaiyar.'
};

export const SIMPLE_STORY: StoryInfo = {
  id: 'story1',
  title: 'காக்கா கதை (The Crow Story)',
  tamil: 'ஒரு காட்டில் ஒரு காக்கா இருந்தது. அதற்கு மிகவும் தாகமாக இருந்தது. அது தண்ணீர் தேடி அலைந்தது. கடைசியில் ஒரு பானையில் കുറച്ച് தண்ணீர் கண்டது.',
  meaning: 'In a forest, there was a crow. It was very thirsty. It searched for water. Finally, it found a little water in a pot.'
};

const generateMCQOptions = (correctText: string, incorrectOptions: string[], correctAnswerIdPrefix?: string): MCQOption[] => {
    const prefix = correctAnswerIdPrefix || correctText.replace(/\s+/g, '_').toLowerCase().substring(0,15);
    const options = [
        { id: `${prefix}_opt_correct`, text: correctText, isCorrect: true },
        ...incorrectOptions.map((opt, index) => ({ id: `${prefix}_opt_incorrect_${index}`, text: opt, isCorrect: false }))
    ];
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
};

let quizQuestions: QuizQuestion[] = [
  // Chapter 1: Alphabets Quiz
  {
    id: 'q1a1', chapterId: 'ch1', type: QuestionType.MCQ, tamilWord: 'அ', source: 'uploaded_image' as 'uploaded_image',
    questionText: "What is the transliteration of 'அ'?", options: generateMCQOptions("a", ["aa", "i", "u"], "q1a1_a"),
    correctAnswer: 'q1a1_a_opt_correct', audioSrc: 'audio/alphabets/a.mp3'
  },
  {
    id: 'q1concept1', chapterId: 'ch1', type: QuestionType.MCQ, source: 'uploaded_image' as 'uploaded_image',
    questionText: "Which of these is a 'Kuril' (short) vowel?", options: generateMCQOptions("இ", ["ஆ", "ஈ", "ஊ"], "q1c1_kuril"),
    correctAnswer: 'q1c1_kuril_opt_correct'
  },
  {
    id: 'q1fill1', chapterId: 'ch1', type: QuestionType.FILL_IN_BLANK, source: 'uploaded_image' as 'uploaded_image',
    questionText: "The Tamil word for 'Apple' starts with __.", blankSegments: ["The Tamil word for 'Apple' starts with ", "."] as [string, string],
    correctAnswer: 'ஆ', answerFormat: 'draw-tamil',
  },
   {
    id: 'q1totalletters', chapterId: 'ch1', type: QuestionType.MCQ, source: 'uploaded_image' as 'uploaded_image',
    questionText: "How many Uyir Ezhuthukkal (vowels) are there?", options:generateMCQOptions("12", ["18", "216", "1"], "q1tl_vowels"),
    correctAnswer: "q1tl_vowels_opt_correct"
  },
  // Chapter 2: Simple Words Quiz
  {
    id: 'q2w1', chapterId: 'ch2', type: QuestionType.MCQ, tamilWord: 'அம்மா', source: 'uploaded_image' as 'uploaded_image',
    questionText: "Meaning of 'அம்மா'?", options: generateMCQOptions("Mother", ["Father", "Sister", "Brother"], "q2w1_amma"),
    correctAnswer: 'q2w1_amma_opt_correct', audioSrc: 'audio/words/ammaa.mp3'
  },
  {
    id: 'q2color1', chapterId: 'ch2', type: QuestionType.MCQ, source: 'uploaded_image' as 'uploaded_image',
    questionText: "Tamil word for 'Red'?", options: generateMCQOptions("சிவப்பு", ["பச்சை", "மஞ்சள்", "நீலம்"], "q2c1_red"),
    correctAnswer: 'q2c1_red_opt_correct', audioSrc: 'audio/words/sivappu.mp3'
  },
  {
    id: 'q2number1', chapterId: 'ch2', type: QuestionType.FILL_IN_BLANK, source: 'uploaded_image' as 'uploaded_image',
    questionText: "Number '5' in Tamil is ____.", blankSegments: ["Number '5' in Tamil is ", "."] as [string, string],
    correctAnswer: 'ஐந்து', answerFormat: 'draw-tamil', audioSrc: 'audio/words/aindhu.mp3'
  },
  {
    id: 'q2animal_mcq_dog', chapterId: 'ch2', type: QuestionType.MCQ, source: 'uploaded_image' as 'uploaded_image',
    questionText: `Which animal is 'நாய்'?`, options: generateMCQOptions("Dog", ["Cat", "Lion", "Horse"], "q2animal_dog"),
    correctAnswer: `q2animal_dog_opt_correct`, audioSrc: 'audio/words/naai.mp3'
  },
  // Chapter 3: Complex Words Quiz
  {
    id: 'q3cw1', chapterId: 'ch3', type: QuestionType.MCQ, tamilWord: 'வாழைப்பழம்', source: 'uploaded_image' as 'uploaded_image',
    questionText: "Meaning of 'வாழைப்பழம்'?", options: generateMCQOptions("Banana", ["Mango", "Guava", "Apple"], "q3cw1_banana"),
    correctAnswer: 'q3cw1_banana_opt_correct', audioSrc: 'audio/words/vaazhaippazham.mp3'
  },
   {
    id: 'q3cw2', chapterId: 'ch3', type: QuestionType.FILL_IN_BLANK, source: 'general' as 'general',
    questionText: "'Thank you' in Tamil is ____.", blankSegments: ["'Thank you' in Tamil is ", "."] as [string, string],
    correctAnswer: 'நன்றி', answerFormat: 'draw-tamil', audioSrc: 'audio/words/nandri.mp3'
  },
  // Chapter 4: Simple Sentences Quiz
  {
    id: 'q4s1', chapterId: 'ch4', type: QuestionType.MCQ, source: 'uploaded_image' as 'uploaded_image',
    questionText: "Meaning of 'சூரியன் காலையில் உதிக்கிறது'?", options: generateMCQOptions("Sun rises in the morning", ["Sun sets in the evening", "Moon shines at night", "Stars twinkle"], "q4s1_sunrise"),
    correctAnswer: 'q4s1_sunrise_opt_correct'
  },
  {
    id: 'q4s3', chapterId: 'ch4', type: QuestionType.MCQ, source: 'uploaded_image' as 'uploaded_image',
    questionText: "Aathichoodi 'அறம் செய விரும்பு' means:", options: generateMCQOptions("Desire to do virtuous deeds", ["Control your anger", "Don't stop learning", "Share with needy"], "q4s3_aram"),
    correctAnswer: 'q4s3_aram_opt_correct'
  },
   {
    id: 'q4fill_sentence_east', chapterId: 'ch4', type: QuestionType.FILL_IN_BLANK, source: 'uploaded_image' as 'uploaded_image',
    questionText: "நிரப்புக: சூரியன் உதிக்கும் திசை ____.", blankSegments: ["சூரியன் உதிக்கும் திசை ", "."] as [string, string],
    correctAnswer: 'கிழக்கு', answerFormat: 'draw-tamil',
  },
  // Chapter 5: Simple Paragraph/Text
  {
    id: 'q5p1', chapterId: 'ch5', type: QuestionType.MCQ, source: 'uploaded_image' as 'uploaded_image',
    questionText: "Aathichoodi: what should one not give up ('கைவிடேல்')?", options: generateMCQOptions("Enthusiasm/Perseverance (ஊக்கம்)", ["Anger (சினம்)", "Charity (ஈவது)", "Learning (ஓதுவது)"], "q5p1_ookam"),
    correctAnswer: 'q5p1_ookam_opt_correct'
  },
  // Chapter 6: Story
  {
    id: 'q6st1', chapterId: 'ch6', type: QuestionType.MCQ, source: 'general' as 'general',
    questionText: "In 'The Crow Story', how did the crow get water?", options: generateMCQOptions("By dropping stones into the pot", ["By using a straw", "By tipping the pot", "By calling a friend"], "q6st1_crow"),
    correctAnswer: 'q6st1_crow_opt_correct'
  },
];

// Function to add more questions programmatically
function addExamQuestions() {
    const examQuestionGenerators = {
        'exam_image1_content': () => {
            const questions: QuizQuestion[] = [];
            // Image 1: Colors, Fruits, Animals, Birds, Numbers, Family, Days
            ALL_IMAGE_WORDS.forEach((word, i) => {
                if (i % 2 === 0) { // MCQ for meaning
                    questions.push({
                        id: `ex1_img_meaning_${i}`, chapterId: 'exam_image1_content', type: QuestionType.MCQ, source: 'uploaded_image' as 'uploaded_image',
                        questionText: `What is the meaning of '${word.tamil}'?`,
                        options: generateMCQOptions(word.meaning, ALL_IMAGE_WORDS.filter(w => w.meaning !== word.meaning).map(w => w.meaning).slice(0, 3), `ex1_m_${word.transliteration}`),
                        correctAnswer: `ex1_m_${word.transliteration}_opt_correct`, audioSrc: word.audioSrc
                    });
                } else { // FIB for Tamil word
                    questions.push({
                        id: `ex1_img_tamil_${i}`, chapterId: 'exam_image1_content', type: QuestionType.FILL_IN_BLANK, source: 'uploaded_image' as 'uploaded_image',
                        questionText: `The word for '${word.meaning}' in Tamil is ____.`,
                        blankSegments: [`The word for '${word.meaning}' in Tamil is `, "."] as [string, string],
                        correctAnswer: word.tamil, answerFormat: 'draw-tamil' as 'draw-tamil', audioSrc: word.audioSrc
                    });
                }
            });
            // Add more specific questions for categories from Image 1
            COLORS_WORDS.forEach((word, i) => questions.push( {
                id: `ex1_color_identify_${i}`, chapterId: 'exam_image1_content', type: QuestionType.MCQ, source: 'uploaded_image' as 'uploaded_image',
                questionText: `Which color is '${word.tamil}'?`,
                options: generateMCQOptions(word.meaning, COLORS_WORDS.filter(c => c.meaning !== word.meaning).map(c=>c.meaning).slice(0,2), `ex1_clr_id_${i}`),
                correctAnswer: `ex1_clr_id_${i}_opt_correct`, audioSrc: word.audioSrc
            }));
             NUMBERS_WORDS.forEach((word, i) => questions.push( {
                id: `ex1_number_meaning_${i}`, chapterId: 'exam_image1_content', type: QuestionType.MCQ, source: 'uploaded_image' as 'uploaded_image',
                questionText: `What does the number '${word.tamil}' represent?`,
                options: generateMCQOptions(word.meaning, NUMBERS_WORDS.filter(n => n.meaning !== word.meaning).map(n=>n.meaning).slice(0,2), `ex1_num_m_${i}`),
                correctAnswer: `ex1_num_m_${i}_opt_correct`, audioSrc: word.audioSrc
            }));

            return questions.slice(0, 50); // Ensure a good number of questions
        },
        'exam_image2_content': () => {
            const questions: QuizQuestion[] = [];
            // Image 2: Alphabet Concepts (Kuril, Nedil, Vallinam, etc., Counts)
            ALPHABET_CONCEPTS.forEach((concept, i) => {
                 questions.push({
                    id: `ex2_concept_desc_${i}`, chapterId: 'exam_image2_content', type: QuestionType.MCQ, source: 'uploaded_image' as 'uploaded_image',
                    questionText: `What is described as: "${concept.meaning.split('\n')[0]}"?`,
                    options: generateMCQOptions(concept.title || "Concept", ALPHABET_CONCEPTS.filter(c=>c.id !== concept.id).map(c=>c.title || `Concept ${c.id}`).slice(0,2), `ex2_cpt_d_${i}`),
                    correctAnswer: `ex2_cpt_d_${i}_opt_correct`
                });
            });
            UYIR_EZHUTHUKKAL.forEach((vowel, i) => {
                if (i < 5) { // Add questions for first 5 vowels for brevity
                     questions.push({
                        id: `ex2_vowel_type_${i}`, chapterId: 'exam_image2_content', type: QuestionType.MCQ, source: 'uploaded_image' as 'uploaded_image',
                        questionText: `Is '${vowel.tamil}' a Kuril or Nedil vowel?`,
                        options: generateMCQOptions(['அ', 'இ', 'உ', 'எ', 'ஒ'].includes(vowel.tamil) ? "Kuril" : "Nedil", [!['அ', 'இ', 'உ', 'எ', 'ஒ'].includes(vowel.tamil) ? "Kuril" : "Nedil"], `ex2_vtype_${i}`),
                        correctAnswer: `ex2_vtype_${i}_opt_correct`, audioSrc: vowel.audioSrc
                    });
                }
            });
             MEI_EZHUTHUKKAL.forEach((consonant, i) => {
                if (i < 6) { // Add for first 6 consonants
                    let type = "";
                    if (['க்', 'ச்', 'ட்', 'த்', 'ப்', 'ற்'].includes(consonant.tamil)) type = "Vallinam";
                    else if (['ங்', 'ஞ்', 'ண்', 'ந்', 'ம்', 'ன்'].includes(consonant.tamil)) type = "Mellinam";
                    else type = "Idaiyinam";
                     questions.push({
                        id: `ex2_consonant_type_${i}`, chapterId: 'exam_image2_content', type: QuestionType.MCQ, source: 'uploaded_image' as 'uploaded_image',
                        questionText: `Which category does '${consonant.tamil}' belong to?`,
                        options: generateMCQOptions(type, ["Vallinam", "Mellinam", "Idaiyinam"].filter(t => t !== type), `ex2_ctype_${i}`),
                        correctAnswer: `ex2_ctype_${i}_opt_correct`, audioSrc: consonant.audioSrc
                    });
                }
            });
            questions.push(
                { id: 'ex2_count_uyirmei_fill', chapterId: 'exam_image2_content', type: QuestionType.FILL_IN_BLANK, source: 'uploaded_image' as 'uploaded_image', questionText: "Total UyirMei ezhuthukkal: ____.", blankSegments: ["Total UyirMei ezhuthukkal: ", "."], correctAnswer: "216", answerFormat: 'text' },
                { id: 'ex2_total_tamil_letters_fill', chapterId: 'exam_image2_content', type: QuestionType.FILL_IN_BLANK, source: 'uploaded_image' as 'uploaded_image', questionText: "Total Tamil letters (including Aayutham): ____.", blankSegments: ["Total Tamil letters (including Aayutham): ", "."], correctAnswer: "247", answerFormat: 'text' }
            );
            return questions.slice(0, 50);
        },
        'exam_image3_content': () => {
            const questions: QuizQuestion[] = [];
            // Image 3: Words (அணில் to ஔடதம்), UyirMei combinations (க்+அ=க type)
            IMAGE3_WORDS.forEach((word, i) => {
                questions.push({
                    id: `ex3_img_word_meaning_${i}`, chapterId: 'exam_image3_content', type: QuestionType.MCQ, source: 'uploaded_image' as 'uploaded_image',
                    questionText: `What is the meaning of the word '${word.tamil}'?`,
                    options: generateMCQOptions(word.meaning, IMAGE3_WORDS.filter(w => w.meaning !== word.meaning).slice(0,3).map(w=>w.meaning), `ex3_word_m_${i}`),
                    correctAnswer: `ex3_word_m_${i}_opt_correct`, audioSrc: word.audioSrc
                });
                 questions.push({
                    id: `ex3_img_word_identify_${i}`, chapterId: 'exam_image3_content', type: QuestionType.FILL_IN_BLANK, source: 'uploaded_image' as 'uploaded_image',
                    questionText: `The word for '${word.meaning}' is ____.`,
                    blankSegments: [`The word for '${word.meaning}' is `, "."] as [string, string],
                    correctAnswer: word.tamil, answerFormat: 'draw-tamil' as 'draw-tamil', audioSrc: word.audioSrc
                });
            });
            // UyirMei Combinations from Image 3's chart structure
            const uyirmeiExamples = [
                {mei: 'க்', uyir: 'ஆ', result: 'கா'}, {mei: 'ச்', uyir: 'இ', result: 'சி'}, {mei: 'ட்', uyir: 'ஈ', result: 'டீ'},
                {mei: 'த்', uyir: 'உ', result: 'து'}, {mei: 'ப்', uyir: 'ஊ', result: 'பூ'}, {mei: 'ற்', uyir: 'எ', result: 'றெ'},
                {mei: 'ங்', uyir: 'ஏ', result: 'ஙே'}, {mei: 'ஞ்', uyir: 'ஐ', result: 'ஞை'}, {mei: 'ண்', uyir: 'ஒ', result: 'ணொ'},
                {mei: 'ந்', uyir: 'ஓ', result: 'நோ'}, {mei: 'ம்', uyir: 'ஔ', result: 'மௌ'},
            ];
            uyirmeiExamples.forEach((ex, i) => {
                 questions.push({
                    id: `ex3_uyirmei_combo_${i}`, chapterId: 'exam_image3_content', type: QuestionType.FILL_IN_BLANK, source: 'uploaded_image' as 'uploaded_image',
                    questionText: `${ex.mei} + ${ex.uyir} = ____ ?`,
                    blankSegments: [`${ex.mei} + ${ex.uyir} = `, " ?"] as [string, string],
                    correctAnswer: ex.result, answerFormat: 'draw-tamil' as 'draw-tamil'
                });
            });
            return questions.slice(0, 50);
        },
        'exam_image4_content': () => {
            const questions: QuizQuestion[] = [];
            // Image 4: "Ennai Patri", "Nirappuga", Aathichoodi
            ENNAI_PATRI_SENTENCES.forEach((sentence, i) => {
                 questions.push({
                    id: `ex4_ennai_patri_meaning_${i}`, chapterId: 'exam_image4_content', type: QuestionType.MCQ, source: 'uploaded_image' as 'uploaded_image',
                    questionText: `What type of information is asked in: "${sentence.tamil.replace('______', '...')}"?`,
                    options: generateMCQOptions(sentence.meaning.replace(' _____.', '').replace(' ______.',''), ["Favorite color", "School subject", "Pet's name"], `ex4_ep_m_${i}`),
                    correctAnswer: `ex4_ep_m_${i}_opt_correct`
                });
            });
            NIRAPPUGA_SENTENCES.forEach((sentence, i) => {
                const parts = sentence.tamil.split(' ');
                const blankWord = parts[parts.length -1].replace('.', '');
                const prompt = parts.slice(0, -1).join(' ') + " ____.";
                 questions.push({
                    id: `ex4_nirappuga_fill_${i}`, chapterId: 'exam_image4_content', type: QuestionType.FILL_IN_BLANK, source: 'uploaded_image' as 'uploaded_image',
                    questionText: `நிரப்புக: ${prompt} (${sentence.meaning})`,
                    blankSegments: [parts.slice(0, -1).join(' ') + " ", "."] as [string, string],
                    correctAnswer: blankWord, answerFormat: 'draw-tamil' as 'draw-tamil'
                });
            });
            AATHICHOODI_SENTENCES.forEach((sentence, i) => {
                 questions.push({
                    id: `ex4_aathichoodi_start_${i}`, chapterId: 'exam_image4_content', type: QuestionType.MCQ, source: 'uploaded_image' as 'uploaded_image',
                    questionText: `Which Aathichoodi starts with '${sentence.tamil.split(' ')[0]}'?`,
                    options: generateMCQOptions(sentence.tamil, AATHICHOODI_SENTENCES.filter(s=>s.id !== sentence.id).map(s=>s.tamil).slice(0,2), `ex4_aa_s_${i}`),
                    correctAnswer: `ex4_aa_s_${i}_opt_correct`
                });
                 questions.push({
                    id: `ex4_aathichoodi_meaning_mcq_${i}`, chapterId: 'exam_image4_content', type: QuestionType.MCQ, source: 'uploaded_image' as 'uploaded_image',
                    questionText: `What is the core meaning of Aathichoodi: '${sentence.tamil}'?`,
                    options: generateMCQOptions(sentence.meaning, AATHICHOODI_SENTENCES.filter(s=>s.id !== sentence.id).map(s=>s.meaning).slice(0,2), `ex4_aa_m_${i}`),
                    correctAnswer: `ex4_aa_m_${i}_opt_correct`
                });
            });
            return questions.slice(0, 50);
        }
    };

    for (const examId in examQuestionGenerators) {
        // @ts-ignore
        quizQuestions.push(...examQuestionGenerators[examId]());
    }
}

addExamQuestions();
export const QUIZ_QUESTIONS_DATA = quizQuestions;


export const CHAPTERS_DATA: ChapterInfo[] = [
  {
    id: 'ch1', title: 'Chapter 1: எழுத்துக்கள் (Alphabets)',
    description: 'Learn Tamil vowels, consonants, their types, and how they combine. Practice writing them.',
    learningContent: { alphabets: ALL_ALPHABETS, paragraphs: ALPHABET_CONCEPTS }, quizId: 'ch1',
  },
  {
    id: 'ch2', title: 'Chapter 2: எளிய சொற்கள் (Simple Words)',
    description: 'Vocabulary for colors, numbers, family, days, simple fruits, animals.',
    learningContent: { words: BASIC_WORDS }, quizId: 'ch2',
  },
  {
    id: 'ch3', title: 'Chapter 3: கூட்டுச் சொற்கள் (Complex Words)',
    description: 'Learn more complex or polysyllabic words.',
    learningContent: { words: COMPLEX_WORDS }, quizId: 'ch3',
  },
  {
    id: 'ch4', title: 'Chapter 4: எளிய வாக்கியங்கள் (Simple Sentences)',
    description: 'Form basic sentences. Learn to introduce yourself and understand Aathichoodi.',
    learningContent: { sentences: [...ENNAI_PATRI_SENTENCES, ...NIRAPPUGA_SENTENCES, ...AATHICHOODI_SENTENCES.slice(0, 2)] }, quizId: 'ch4',
  },
  {
    id: 'ch5', title: 'Chapter 5: எளிய பத்தி (Simple Paragraph)',
    description: 'Read short paragraphs, including Aathichoodi collections.',
    learningContent: { paragraphs: [SIMPLE_PARAGRAPH, AATHICHOODI_PARAGRAPH] }, quizId: 'ch5',
  },
  {
    id: 'ch6', title: 'Chapter 6: சின்னக் கதை (Short Story)',
    description: 'Read a short story to improve comprehension.',
    learningContent: { story: SIMPLE_STORY }, quizId: 'ch6',
  },
  {
    id: 'ch_final_exams', title: 'Chapter 7: இறுதித் தேர்வுகள் (Final Exams Hub)',
    description: 'Comprehensive final exams based on the material from your uploaded images.',
    examList: [
        { id: 'exam_image1_content', title: 'Exam 1: Words & Categories (Image 1)', description: 'Test your knowledge on colors, fruits, animals, numbers, family, and days.'},
        { id: 'exam_image2_content', title: 'Exam 2: Alphabet Concepts (Image 2)', description: 'Test your understanding of vowel & consonant types and letter counts.'},
        { id: 'exam_image3_content', title: 'Exam 3: Word Practice & UyirMei (Image 3)', description: 'Focus on various words and UyirMei letter combinations.'},
        { id: 'exam_image4_content', title: 'Exam 4: Sentences & Aathichoodi (Image 4)', description: 'Test your ability with sentence structures and Aathichoodi.'},
    ],
    // quizId: 'ch_final_exams_overall_quiz_placeholder' // REMOVED quizId from here
  }
];

// Validation
QUIZ_QUESTIONS_DATA.forEach(q => {
    const chapterExists = CHAPTERS_DATA.some(c => c.id === q.chapterId);
    const examExists = CHAPTERS_DATA.find(c => c.id === 'ch_final_exams')?.examList?.some(e => e.id === q.chapterId);
    if (!chapterExists && !examExists) {
        // console.error(`Error: Question id ${q.id} has invalid chapterId/examId: ${q.chapterId}`);
    }
});
CHAPTERS_DATA.forEach(c => {
    if (c.quizId && !QUIZ_QUESTIONS_DATA.some(q => q.chapterId === c.id)) {
        // console.warn(`Warning: Chapter ${c.title} has quizId ${c.quizId} but no direct questions found for chapterId ${c.id}. Check if questions use this ID.`);
    }
});
CHAPTERS_DATA.find(c => c.id === 'ch_final_exams')?.examList?.forEach(exam => {
    if (!QUIZ_QUESTIONS_DATA.some(q => q.chapterId === exam.id)) {
        // console.warn(`Warning: Final Exam "${exam.title}" (id: ${exam.id}) has no questions associated with it in QUIZ_QUESTIONS_DATA.`);
    }
});
// console.log("Total questions loaded:", QUIZ_QUESTIONS_DATA.length);
// ['exam_image1_content', 'exam_image2_content', 'exam_image3_content', 'exam_image4_content'].forEach(examId => {
//     const count = QUIZ_QUESTIONS_DATA.filter(q => q.chapterId === examId).length;
//     console.log(`Questions for ${examId}: ${count}`);
// });
