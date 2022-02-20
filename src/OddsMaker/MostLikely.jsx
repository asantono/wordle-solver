import { useState, useEffect } from 'react'
import { allowedGuessArray } from '../Utilities/allowedGuess.js'
import { FixedSizeList } from 'react-window'
import './most-likely.css'

const MostLikely = () => {
  // Grey Letters
  const [usedLetters, setUsedLetters] = useState({})
  const [usedLettersString, setUsedLettersString] = useState('')
  // Word List Updated and Scored
  const [wordListScored, setWordListScored] = useState([])
  // Green Letters
  const [knownLetters, setKnownLetters] = useState({
    one: '',
    two: '',
    three: '',
    four: '',
    five: ''
  })
  // Extra Gold Inputs Toggle
  const [extraPositions, setExtraPositions] = useState(false)
  // Gold  Letters In Object Form
  const [goldLetters, setGoldLetters] = useState({
    one: { one: '', two: '', three: '', four: '', five: '' },
    two: { one: '', two: '', three: '', four: '', five: '' },
    three: { one: '', two: '', three: '', four: '', five: '' },
    four: { one: '', two: '', three: '', four: '', five: '' },
    five: { one: '', two: '', three: '', four: '', five: '' }
  })

  useEffect(() => {
    findBestWords()
  }, [
    JSON.stringify(goldLetters),
    usedLetters,
    knownLetters.one,
    knownLetters.two,
    knownLetters.three,
    knownLetters.four,
    knownLetters.five
  ])

  const goldLetterChange = (e, row) => {
    if (!checkUndercase(e.target.value)) return
    setGoldLetters({
      ...goldLetters,
      [row]: { ...goldLetters[row], [e.target.name]: e.target.value }
    })
  }

  const targetLetterChange = (e) => {
    if (!checkUndercase(e.target.value)) return
    setKnownLetters({ ...knownLetters, [e.target.name]: e.target.value })
  }

  const checkUndercase = (text) => {
    if (!text) return true
    let re = new RegExp('^[a-z]*$')
    if (re.test(text)) return true
    else return false
  }

  const usedLetterChange = (e) => {
    if (!checkUndercase(e.target.value)) return
    setUsedLettersString(e.target.value)
    let objMaker = {},
      splitVal = e.target.value.split('')
    splitVal.forEach((element) => {
      let trimmed = element.trim()
      if (trimmed.length === 1 && !objMaker[trimmed]) {
        objMaker[trimmed] = true
      }
    })
    setUsedLetters(objMaker)
  }

  const findBestWords = () => {
    let letterCount = {},
      wordListTemp = [...allowedGuessArray],
      wordList = [],
      useWord = true,
      useWordFound = true

    // Check Green Known Letters and Filter
    // ** We start with a single loop
    for (let x = 0; x < wordListTemp.length; x++) {
      if (
        (knownLetters.one && knownLetters.one !== wordListTemp[x][0]) ||
        (knownLetters.two && knownLetters.two !== wordListTemp[x][1]) ||
        (knownLetters.three && knownLetters.three !== wordListTemp[x][2]) ||
        (knownLetters.four && knownLetters.four !== wordListTemp[x][3]) ||
        (knownLetters.five && knownLetters.five !== wordListTemp[x][4])
      ) {
        useWordFound = false
      }
      if (useWordFound) {
        wordList.push(wordListTemp[x])
      }
      useWordFound = true
    }

    wordListTemp = [...wordList]
    wordList = []

    // create gold letters list
    // ** First Double Loop quadratic time
    let goldKeys = Object.keys(goldLetters),
      tempGold = [],
      foundGold = false
    for (let v = 0; v < goldKeys.length; v++) {
      for (let g = 0; g < goldKeys.length; g++) {
        if (goldLetters[goldKeys[v]][goldKeys[g]])
          tempGold.push(goldLetters[goldKeys[v]][goldKeys[g]])
      }
    }

    if (tempGold.length) {
      // Check gold letters
      // They must not be in the position they are
      // They must be in the word
      // **  Example of where a second loop can greatly improve
      // **  the coding experience
      for (let q = 0; q < wordListTemp.length; q++) {
        if (
          !(
            (goldLetters.one['one'] &&
              goldLetters.one['one'] === wordListTemp[q][0]) ||
            (goldLetters.two['one'] &&
              goldLetters.two['one'] === wordListTemp[q][0]) ||
            (goldLetters.three['one'] &&
              goldLetters.three['one'] === wordListTemp[q][0]) ||
            (goldLetters.four['one'] &&
              goldLetters.four['one'] === wordListTemp[q][0]) ||
            (goldLetters.five['one'] &&
              goldLetters.five['one'] === wordListTemp[q][0]) ||
            (goldLetters.one['two'] &&
              goldLetters.one['two'] === wordListTemp[q][1]) ||
            (goldLetters.two['two'] &&
              goldLetters.two['two'] === wordListTemp[q][1]) ||
            (goldLetters.three['two'] &&
              goldLetters.three['two'] === wordListTemp[q][1]) ||
            (goldLetters.four['two'] &&
              goldLetters.four['two'] === wordListTemp[q][1]) ||
            (goldLetters.five['two'] &&
              goldLetters.five['two'] === wordListTemp[q][1]) ||
            (goldLetters.one['three'] &&
              goldLetters.one['three'] === wordListTemp[q][2]) ||
            (goldLetters.two['three'] &&
              goldLetters.two['three'] === wordListTemp[q][2]) ||
            (goldLetters.three['three'] &&
              goldLetters.three['three'] === wordListTemp[q][2]) ||
            (goldLetters.four['three'] &&
              goldLetters.four['three'] === wordListTemp[q][2]) ||
            (goldLetters.five['three'] &&
              goldLetters.five['three'] === wordListTemp[q][2]) ||
            (goldLetters.one['four'] &&
              goldLetters.one['four'] === wordListTemp[q][3]) ||
            (goldLetters.two['four'] &&
              goldLetters.two['four'] === wordListTemp[q][3]) ||
            (goldLetters.three['four'] &&
              goldLetters.three['four'] === wordListTemp[q][3]) ||
            (goldLetters.four['four'] &&
              goldLetters.four['four'] === wordListTemp[q][3]) ||
            (goldLetters.five['four'] &&
              goldLetters.five['four'] === wordListTemp[q][3]) ||
            (goldLetters.one['five'] &&
              goldLetters.one['five'] === wordListTemp[q][4]) ||
            (goldLetters.two['five'] &&
              goldLetters.two['five'] === wordListTemp[q][4]) ||
            (goldLetters.three['five'] &&
              goldLetters.three['five'] === wordListTemp[q][4]) ||
            (goldLetters.four['five'] &&
              goldLetters.four['five'] === wordListTemp[q][4]) ||
            (goldLetters.five['five'] &&
              goldLetters.five['five'] === wordListTemp[q][4])
          )
        ) {
          // ** This is only the second loop due to the
          // ** long code above
          for (let w = 0; w < wordListTemp[q].length; w++) {
            if (tempGold.includes(wordListTemp[q][w])) {
              foundGold = true
            }
            if (w === wordListTemp[q].length - 1 && foundGold) {
              wordList.push(wordListTemp[q])
            }
          }
        }
        foundGold = false
      }
      wordListTemp = [...wordList]
      wordList = []
    }

    // ** Proper looping for used letters
    for (let i = 0; i < wordListTemp.length; i++) {
      // loop removes words with used letters
      for (let j = 0; j < wordListTemp[i].length; j++) {
        if (usedLetters[wordListTemp[i][j]]) {
          useWord = false
        }
        // add to wordList if useable
        if (j === wordListTemp[i].length - 1 && useWord) {
          wordList.push(wordListTemp[i])
        }
        if (j === wordListTemp[i].length - 1) useWord = true
      }
    }

    // ** Proper looping for letter frequency
    for (let b = 0; b < wordList.length; b++) {
      for (let z = 0; z < wordList[b].length; z++) {
        // Create a letter count for letter frequency
        letterCount[wordList[b][z]]
          ? (letterCount[wordList[b][z]] = letterCount[wordList[b][z]] + 1)
          : (letterCount[wordList[b][z]] = 1)
      }
    }

    // ** For In loop iterates objects
    // Create Best Letters Object
    let bestLetters = []
    for (let prop in letterCount) {
      bestLetters.push([prop, letterCount[prop]])
    }

    // ** Sorting based on the second value in each array
    // ** which letters has the best letter score
    // Sort the best letters by rate of appearance
    bestLetters = bestLetters.sort((a, b) => b[1] - a[1])

    // ** One more loop to find the best guesses
    // ** by the letter score
    // Find the current best guess
    let wordsScored = [],
      lettersInWord = {},
      wordScore = 0

    for (let i = 0; i < wordList.length; i++) {
      for (let j = 0; j < wordList[i].length; j++) {
        if (!lettersInWord[wordList[i][j]]) {
          lettersInWord[wordList[i][j]] = true
          wordScore += letterCount[wordList[i][j]]
        }
        if (j === wordList[i].length - 1) {
          wordsScored.push([wordList[i], wordScore])
          wordScore = 0
          lettersInWord = {}
        }
      }
    }

    // ** Sort the scored words
    wordsScored.sort((a, b) => b[1] - a[1])

    setWordListScored(wordsScored)
  }

  const Row = ({ index, style }) => (
    <div
      style={style}
      className={`most-likely__list--item ${
        index % 2 === 1 ? 'most-likely__bv-grey' : ''
      }`}
      key={index}
    >
      <div className="most-likely__list--item--element">
        {wordListScored[index][0]}
      </div>

      <div className="most-likely__list--item--element">
        {wordListScored[index][1]}
      </div>
    </div>
  )

  return (
    <div>
      <div className="most-likely__page-title">Wordle Solver!</div>
      <div className="most-likely__center margin__bottom--2rem">
        <label className="most-likely__label bold" htmlFor="usedLetters">
          Grey Letters
        </label>

        <input
          className="most-likely__input"
          type="text"
          id="usedLetters"
          placeholder="abzte"
          value={usedLettersString}
          onChange={(e) => usedLetterChange(e)}
        ></input>
      </div>
      {/* <div className="most-likely__center margin__bottom--2rem">
        <label className="most-likely__label"  htmlFor="foundLetters">Good Letters <span className="wordle__gold">(Gold)</span></label>
<input className="most-likely__input"  type="text" id="foundLetters" placeholder="etzba"
    onChange={(e) => foundLetterChange(e)}
    value={foundLettersString}
>
</input>
</div> */}

      <div className="most-likely__center margin__bottom--2rem ">
        <div>
          <div className="most-likely__section--title">
            Gold Letter Positions
          </div>
          <div className="most-likely__target-letter--container margin__bottom--1rem">
            {/* <label htmlFor="letterOne"><span className="wordle__green">Green</span> Letter 1</label> */}
            <input
              className="most-likely__target-letter--input wordle__gold--bg"
              type="text"
              name="one"
              placeholder="f"
              onChange={(e) => goldLetterChange(e, 'one')}
              value={goldLetters.one['one']}
              maxLength={1}
            ></input>
            {/* <label htmlFor="letterTwo">Green Letter 2</label> */}
            <input
              className="most-likely__target-letter--input wordle__gold--bg"
              type="text"
              placeholder="o"
              onChange={(e) => goldLetterChange(e, 'one')}
              name="two"
              value={goldLetters.one['two']}
              maxLength={1}
            ></input>
            {/* <label htmlFor="letterThree">Green Letter 3</label> */}
            <input
              className="most-likely__target-letter--input wordle__gold--bg"
              type="text"
              placeholder="u"
              onChange={(e) => goldLetterChange(e, 'one')}
              name="three"
              value={goldLetters.one['three']}
              maxLength={1}
            ></input>
            {/* <label htmlFor="letterFour">Green Letter 4</label> */}
            <input
              className="most-likely__target-letter--input wordle__gold--bg"
              type="text"
              placeholder="n"
              onChange={(e) => goldLetterChange(e, 'one')}
              name="four"
              value={goldLetters.one['four']}
              maxLength={1}
            ></input>
            {/* <label htmlFor="letterFive">Green Letter 5</label> */}
            <input
              className="most-likely__target-letter--input wordle__gold--bg"
              type="text"
              placeholder="d"
              onChange={(e) => goldLetterChange(e, 'one')}
              name="five"
              value={goldLetters.one['five']}
              maxLength={1}
            ></input>
          </div>

          <div className="most-likely__target-letter--container margin__bottom--1rem">
            <input
              className="most-likely__target-letter--input wordle__gold--bg"
              type="text"
              name="one"
              placeholder="f"
              onChange={(e) => goldLetterChange(e, 'two')}
              value={goldLetters.two['one']}
              maxLength={1}
            />
            <input
              className="most-likely__target-letter--input wordle__gold--bg"
              type="text"
              placeholder="o"
              onChange={(e) => goldLetterChange(e, 'two')}
              name="two"
              value={goldLetters.two['two']}
              maxLength={1}
            />
            <input
              className="most-likely__target-letter--input wordle__gold--bg"
              type="text"
              placeholder="u"
              onChange={(e) => goldLetterChange(e, 'two')}
              name="three"
              value={goldLetters.two['three']}
              maxLength={1}
            />
            <input
              className="most-likely__target-letter--input wordle__gold--bg"
              type="text"
              placeholder="n"
              onChange={(e) => goldLetterChange(e, 'two')}
              name="four"
              value={goldLetters.two['four']}
              maxLength={1}
            />
            <input
              className="most-likely__target-letter--input wordle__gold--bg"
              type="text"
              placeholder="d"
              onChange={(e) => goldLetterChange(e, 'two')}
              name="five"
              value={goldLetters.two['five']}
              maxLength={1}
            />
          </div>

          <div className="most-likely__target-letter--container margin__bottom--1rem">
            <input
              className="most-likely__target-letter--input wordle__gold--bg"
              type="text"
              name="one"
              placeholder="f"
              onChange={(e) => goldLetterChange(e, 'three')}
              value={goldLetters.three['one']}
              maxLength={1}
            />
            <input
              className="most-likely__target-letter--input wordle__gold--bg"
              type="text"
              placeholder="o"
              onChange={(e) => goldLetterChange(e, 'three')}
              name="two"
              value={goldLetters.three['two']}
              maxLength={1}
            />
            <input
              className="most-likely__target-letter--input wordle__gold--bg"
              type="text"
              placeholder="u"
              onChange={(e) => goldLetterChange(e, 'three')}
              name="three"
              value={goldLetters.three['three']}
              maxLength={1}
            />
            <input
              className="most-likely__target-letter--input wordle__gold--bg"
              type="text"
              placeholder="n"
              onChange={(e) => goldLetterChange(e, 'three')}
              name="four"
              value={goldLetters.three['four']}
              maxLength={1}
            />
            <input
              className="most-likely__target-letter--input wordle__gold--bg"
              type="text"
              placeholder="d"
              onChange={(e) => goldLetterChange(e, 'three')}
              name="five"
              value={goldLetters.three['five']}
              maxLength={1}
            />
          </div>
          {extraPositions && (
            <>
              <div className="most-likely__target-letter--container margin__bottom--1rem">
                <input
                  className="most-likely__target-letter--input wordle__gold--bg"
                  type="text"
                  name="one"
                  placeholder="f"
                  onChange={(e) => goldLetterChange(e, 'four')}
                  value={goldLetters.four['one']}
                  maxLength={1}
                />
                <input
                  className="most-likely__target-letter--input wordle__gold--bg"
                  type="text"
                  placeholder="o"
                  onChange={(e) => goldLetterChange(e, 'four')}
                  name="two"
                  value={goldLetters.four['two']}
                  maxLength={1}
                />
                <input
                  className="most-likely__target-letter--input wordle__gold--bg"
                  type="text"
                  placeholder="u"
                  onChange={(e) => goldLetterChange(e, 'four')}
                  name="three"
                  value={goldLetters.four['three']}
                  maxLength={1}
                />
                <input
                  className="most-likely__target-letter--input wordle__gold--bg"
                  type="text"
                  placeholder="n"
                  onChange={(e) => goldLetterChange(e, 'four')}
                  name="four"
                  value={goldLetters.four['four']}
                  maxLength={1}
                />
                <input
                  className="most-likely__target-letter--input wordle__gold--bg"
                  type="text"
                  placeholder="d"
                  onChange={(e) => goldLetterChange(e, 'four')}
                  name="five"
                  value={goldLetters.four['five']}
                  maxLength={1}
                />
              </div>

              <div className="most-likely__target-letter--container margin__bottom--1rem">
                <input
                  className="most-likely__target-letter--input wordle__gold--bg"
                  type="text"
                  name="one"
                  placeholder="f"
                  onChange={(e) => goldLetterChange(e, 'five')}
                  value={goldLetters.five['one']}
                  maxLength={1}
                />
                <input
                  className="most-likely__target-letter--input wordle__gold--bg"
                  type="text"
                  placeholder="o"
                  onChange={(e) => goldLetterChange(e, 'five')}
                  name="two"
                  value={goldLetters.five['two']}
                  maxLength={1}
                />
                <input
                  className="most-likely__target-letter--input wordle__gold--bg"
                  type="text"
                  placeholder="u"
                  onChange={(e) => goldLetterChange(e, 'five')}
                  name="three"
                  value={goldLetters.five['three']}
                  maxLength={1}
                />
                <input
                  className="most-likely__target-letter--input wordle__gold--bg"
                  type="text"
                  placeholder="n"
                  onChange={(e) => goldLetterChange(e, 'five')}
                  name="four"
                  value={goldLetters.five['four']}
                  maxLength={1}
                />
                <input
                  className="most-likely__target-letter--input wordle__gold--bg"
                  type="text"
                  placeholder="d"
                  onChange={(e) => goldLetterChange(e, 'five')}
                  name="five"
                  value={goldLetters.five['five']}
                  maxLength={1}
                />
              </div>
            </>
          )}
          <div
            className="most-likely__center margin__top--1rem color__blue bold underline onHover--pointer color__blue--hover"
            onClick={() => setExtraPositions(!extraPositions)}
          >
            {extraPositions ? 'Less Gold Positions' : 'More Gold Positions'}
          </div>
        </div>
      </div>

      <div className="most-likely__center margin__bottom--2rem">
        <div>
          <div className="most-likely__section--title">
            Green Letter Positions
          </div>
          <div className="most-likely__target-letter--container">
            <input
              className="most-likely__target-letter--input wordle__green--bg"
              type="text"
              id="letterOne"
              name="one"
              placeholder="w"
              onChange={(e) => targetLetterChange(e)}
              value={knownLetters.one}
              maxLength={1}
            />
            <input
              className="most-likely__target-letter--input wordle__green--bg"
              type="text"
              id="letterTwo"
              placeholder="o"
              onChange={(e) => targetLetterChange(e)}
              name="two"
              value={knownLetters.two}
              maxLength={1}
            />
            <input
              className="most-likely__target-letter--input wordle__green--bg"
              type="text"
              id="letterThree"
              placeholder="r"
              onChange={(e) => targetLetterChange(e)}
              name="three"
              value={knownLetters.three}
              maxLength={1}
            />
            <input
              className="most-likely__target-letter--input wordle__green--bg"
              type="text"
              id="letterFour"
              placeholder="d"
              onChange={(e) => targetLetterChange(e)}
              name="four"
              value={knownLetters.four}
              maxLength={1}
            />
            <input
              className="most-likely__target-letter--input wordle__green--bg"
              type="text"
              id="letterFive"
              placeholder="s"
              onChange={(e) => targetLetterChange(e)}
              name="five"
              value={knownLetters.five}
              maxLength={1}
            />
          </div>
        </div>
      </div>
      <div className="most-likely__list--container">
        <div className="most-likely__match-list-width">
          <div className="most-likely__title">Matches</div>
        </div>
        <FixedSizeList
          className="most-likely__list"
          height={290}
          itemSize={26}
          width={240}
          itemCount={wordListScored.length}
        >
          {Row}
        </FixedSizeList>
      </div>
    </div>
  )
}

export default MostLikely
