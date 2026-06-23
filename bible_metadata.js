const BIBLE_METADATA = [
  {
    "id": 1,
    "name_en": "Genesis",
    "name_es": "G\u00e9nesis",
    "chapters": 50
  },
  {
    "id": 2,
    "name_en": "Exodus",
    "name_es": "\u00c9xodo",
    "chapters": 40
  },
  {
    "id": 3,
    "name_en": "Leviticus",
    "name_es": "Lev\u00edtico",
    "chapters": 27
  },
  {
    "id": 4,
    "name_en": "Numbers",
    "name_es": "N\u00fameros",
    "chapters": 36
  },
  {
    "id": 5,
    "name_en": "Deuteronomy",
    "name_es": "Deuteronomio",
    "chapters": 34
  },
  {
    "id": 6,
    "name_en": "Joshua",
    "name_es": "Josu\u00e9",
    "chapters": 24
  },
  {
    "id": 7,
    "name_en": "Judges",
    "name_es": "Jueces",
    "chapters": 21
  },
  {
    "id": 8,
    "name_en": "Ruth",
    "name_es": "Rut",
    "chapters": 4
  },
  {
    "id": 9,
    "name_en": "1 Samuel",
    "name_es": "1 Samuel",
    "chapters": 31
  },
  {
    "id": 10,
    "name_en": "2 Samuel",
    "name_es": "2 Samuel",
    "chapters": 24
  },
  {
    "id": 11,
    "name_en": "1 Kings",
    "name_es": "1 Reyes",
    "chapters": 22
  },
  {
    "id": 12,
    "name_en": "2 Kings",
    "name_es": "2 Reyes",
    "chapters": 25
  },
  {
    "id": 13,
    "name_en": "1 Chronicles",
    "name_es": "1 Cr\u00f3nicas",
    "chapters": 29
  },
  {
    "id": 14,
    "name_en": "2 Chronicles",
    "name_es": "2 Cr\u00f3nicas",
    "chapters": 36
  },
  {
    "id": 15,
    "name_en": "Ezra",
    "name_es": "Esdras",
    "chapters": 10
  },
  {
    "id": 16,
    "name_en": "Nehemiah",
    "name_es": "Nehem\u00edas",
    "chapters": 13
  },
  {
    "id": 17,
    "name_en": "Esther",
    "name_es": "Ester",
    "chapters": 10
  },
  {
    "id": 18,
    "name_en": "Job",
    "name_es": "Job",
    "chapters": 42
  },
  {
    "id": 19,
    "name_en": "Psalms",
    "name_es": "Salmos",
    "chapters": 150
  },
  {
    "id": 20,
    "name_en": "Proverbs",
    "name_es": "Proverbios",
    "chapters": 31
  },
  {
    "id": 21,
    "name_en": "Ecclesiastes",
    "name_es": "Eclesiast\u00e9s",
    "chapters": 12
  },
  {
    "id": 22,
    "name_en": "Song of Solomon",
    "name_es": "Cantares",
    "chapters": 8
  },
  {
    "id": 23,
    "name_en": "Isaiah",
    "name_es": "Isa\u00edas",
    "chapters": 66
  },
  {
    "id": 24,
    "name_en": "Jeremiah",
    "name_es": "Jerem\u00edas",
    "chapters": 52
  },
  {
    "id": 25,
    "name_en": "Lamentations",
    "name_es": "Lamentaciones",
    "chapters": 5
  },
  {
    "id": 26,
    "name_en": "Ezekiel",
    "name_es": "Ezequiel",
    "chapters": 48
  },
  {
    "id": 27,
    "name_en": "Daniel",
    "name_es": "Daniel",
    "chapters": 12
  },
  {
    "id": 28,
    "name_en": "Hosea",
    "name_es": "Oseas",
    "chapters": 14
  },
  {
    "id": 29,
    "name_en": "Joel",
    "name_es": "Joel",
    "chapters": 3
  },
  {
    "id": 30,
    "name_en": "Amos",
    "name_es": "Am\u00f3s",
    "chapters": 9
  },
  {
    "id": 31,
    "name_en": "Obadiah",
    "name_es": "Abd\u00edas",
    "chapters": 1
  },
  {
    "id": 32,
    "name_en": "Jonah",
    "name_es": "Jon\u00e1s",
    "chapters": 4
  },
  {
    "id": 33,
    "name_en": "Micah",
    "name_es": "Miqueas",
    "chapters": 7
  },
  {
    "id": 34,
    "name_en": "Nahum",
    "name_es": "Nah\u00fam",
    "chapters": 3
  },
  {
    "id": 35,
    "name_en": "Habakkuk",
    "name_es": "Habacuc",
    "chapters": 3
  },
  {
    "id": 36,
    "name_en": "Zephaniah",
    "name_es": "Sofon\u00edas",
    "chapters": 3
  },
  {
    "id": 37,
    "name_en": "Haggai",
    "name_es": "Hageo",
    "chapters": 2
  },
  {
    "id": 38,
    "name_en": "Zechariah",
    "name_es": "Zacar\u00edas",
    "chapters": 14
  },
  {
    "id": 39,
    "name_en": "Malachi",
    "name_es": "Malaqu\u00edas",
    "chapters": 4
  },
  {
    "id": 40,
    "name_en": "Matthew",
    "name_es": "Mateo",
    "chapters": 28
  },
  {
    "id": 41,
    "name_en": "Mark",
    "name_es": "Marcos",
    "chapters": 16
  },
  {
    "id": 42,
    "name_en": "Luke",
    "name_es": "Lucas",
    "chapters": 24
  },
  {
    "id": 43,
    "name_en": "John",
    "name_es": "Juan",
    "chapters": 21
  },
  {
    "id": 44,
    "name_en": "Acts",
    "name_es": "Hechos",
    "chapters": 28
  },
  {
    "id": 45,
    "name_en": "Romans",
    "name_es": "Romanos",
    "chapters": 16
  },
  {
    "id": 46,
    "name_en": "1 Corinthians",
    "name_es": "1 Corintios",
    "chapters": 16
  },
  {
    "id": 47,
    "name_en": "2 Corinthians",
    "name_es": "2 Corintios",
    "chapters": 13
  },
  {
    "id": 48,
    "name_en": "Galatians",
    "name_es": "G\u00e1latas",
    "chapters": 6
  },
  {
    "id": 49,
    "name_en": "Ephesians",
    "name_es": "Efesios",
    "chapters": 6
  },
  {
    "id": 50,
    "name_en": "Philippians",
    "name_es": "Filipenses",
    "chapters": 4
  },
  {
    "id": 51,
    "name_en": "Colossians",
    "name_es": "Colosenses",
    "chapters": 4
  },
  {
    "id": 52,
    "name_en": "1 Thessalonians",
    "name_es": "1 Tesalonicenses",
    "chapters": 5
  },
  {
    "id": 53,
    "name_en": "2 Thessalonians",
    "name_es": "2 Tesalonicenses",
    "chapters": 3
  },
  {
    "id": 54,
    "name_en": "1 Timothy",
    "name_es": "1 Timoteo",
    "chapters": 6
  },
  {
    "id": 55,
    "name_en": "2 Timothy",
    "name_es": "2 Timoteo",
    "chapters": 4
  },
  {
    "id": 56,
    "name_en": "Titus",
    "name_es": "Tito",
    "chapters": 3
  },
  {
    "id": 57,
    "name_en": "Philemon",
    "name_es": "Filem\u00f3n",
    "chapters": 1
  },
  {
    "id": 58,
    "name_en": "Hebrews",
    "name_es": "Hebreos",
    "chapters": 13
  },
  {
    "id": 59,
    "name_en": "James",
    "name_es": "Santiago",
    "chapters": 5
  },
  {
    "id": 60,
    "name_en": "1 Peter",
    "name_es": "1 Pedro",
    "chapters": 5
  },
  {
    "id": 61,
    "name_en": "2 Peter",
    "name_es": "2 Pedro",
    "chapters": 3
  },
  {
    "id": 62,
    "name_en": "1 John",
    "name_es": "1 Juan",
    "chapters": 5
  },
  {
    "id": 63,
    "name_en": "2 John",
    "name_es": "2 Juan",
    "chapters": 1
  },
  {
    "id": 64,
    "name_en": "3 John",
    "name_es": "3 Juan",
    "chapters": 1
  },
  {
    "id": 65,
    "name_en": "Jude",
    "name_es": "Judas",
    "chapters": 1
  },
  {
    "id": 66,
    "name_en": "Revelation",
    "name_es": "Apocalipsis",
    "chapters": 22
  }
];
