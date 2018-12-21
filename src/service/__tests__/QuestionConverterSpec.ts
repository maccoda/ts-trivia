import ConvertApiDataToModel from "../QuestionConverter";
import QuestionModel from "../../model/QuestionModel";

describe('QuestionConverter', () => {
  const exampleResponse = {
    response_code: 0,
    results: [
      {
        category: 'History',
        type: 'multiple',
        difficulty: 'hard',
        question:
          'Spain was formed in 1469 with the marriage of Isabella I of Castile and Ferdinand II of what other Iberian kingdom?',
        correct_answer: 'Aragon',
        incorrect_answers: ['Galicia', 'Le&oacute;n', 'Navarre']
      },
      {
        category: 'Entertainment: Video Games',
        type: 'multiple',
        difficulty: 'medium',
        question:
          'In World of Warcraft Lore, four Old Gods created a giant and powerful creature. What was it called? ',
        correct_answer: 'The Ancient One',
        incorrect_answers: ['Anomalous', 'Eater of Souls', 'The Lich King']
      },
      {
        category: 'General Knowledge',
        type: 'multiple',
        difficulty: 'easy',
        question: 'What is the nickname of the US state of California?',
        correct_answer: 'Golden State',
        incorrect_answers: ['Sunshine State', 'Bay State', 'Treasure State']
      },
      {
        category: 'Entertainment: Musicals & Theatres',
        type: 'multiple',
        difficulty: 'hard',
        question:
          'What is the name of Broadway&#039;s first &quot;long-run&quot; musical?',
        correct_answer: 'The Elves',
        incorrect_answers: ['Wicked', 'Hamilton', 'The Book of Mormon']
      },
      {
        category: 'Entertainment: Video Games',
        type: 'multiple',
        difficulty: 'easy',
        question:
          'The starting pistol of the Terrorist team in a competitive match of Counter Strike: Global Offensive is what?',
        correct_answer: 'Glock-18',
        incorrect_answers: ['Tec-9', 'Desert Eagle', 'Dual Berretas']
      },
      {
        category: 'Entertainment: Books',
        type: 'multiple',
        difficulty: 'medium',
        question:
          'In the year 1818, novelist Mary Shelly is credited with writing a fiction novel and creating this infamous character.',
        correct_answer: 'Frankenstein&#039;s monster',
        incorrect_answers: ['Dracula', 'The Thing', 'The Invisible Man']
      },
      {
        category: 'History',
        type: 'multiple',
        difficulty: 'hard',
        question:
          'The Hagia Sophia was commissioned by which emperor of the Byzantine Empire?',
        correct_answer: 'Justinian I',
        incorrect_answers: [
          'Constantine IV',
          'Arcadius',
          'Theodosius the Great'
        ]
      },
      {
        category: 'Entertainment: Television',
        type: 'multiple',
        difficulty: 'hard',
        question: 'What is the Klingon&#039;s afterlife called?',
        correct_answer: 'Sto-vo-kor',
        incorrect_answers: ['Valhalla', 'Karon&#039;gahk', 'New Jersey']
      },
      {
        category: 'Entertainment: Board Games',
        type: 'boolean',
        difficulty: 'medium',
        question:
          '&quot;Rich Uncle Pennybags&quot; from the board game &quot;Monopoly&quot; wears a monocle.',
        correct_answer: 'False',
        incorrect_answers: ['True']
      },
      {
        category: 'Entertainment: Board Games',
        type: 'multiple',
        difficulty: 'medium',
        question:
          'In &quot;Magic: The Gathering&quot;, during the design for Planar Chaos, what color did the developers think of adding in as the sixth color?',
        correct_answer: 'Purple',
        incorrect_answers: ['Brown', 'Pink', 'Orange']
      }
    ]
  };
  it('should convert API response into question model', () => {
    const input = {
      category: 'Entertainment: Board Games',
      type: 'multiple',
      difficulty: 'medium',
      question:
        'In &quot;Magic: The Gathering&quot;, during the design for Planar Chaos, what color did the developers think of adding in as the sixth color?',
      correct_answer: 'Purple',
      incorrect_answers: ['Brown', 'Pink', 'Orange']
    };
    const actual = ConvertApiDataToModel(input)

    const expected: QuestionModel = {
        questionText: 'In "Magic: The Gathering", during the design for Planar Chaos, what color did the developers think of adding in as the sixth color?',
        answers: [
            {
                text: 'Brown',
                correct: false
            },
            {
                text: 'Pink',
                correct: false
            },
            {
                text: 'Orange',
                correct: false
            },
            {
                text: 'Purple',
                correct: true
            }
        ]
    }
    expect(actual).toMatchObject(expected)
  });
});
