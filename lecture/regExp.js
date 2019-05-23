/**
 * ################## Regular Expressions ##################
 * 0. https://regex101.com
 * 
 *      ^^^^^^^^^^^^^ Character classes ^^^^^^^^^^^^^
 * 1. text: "the cat sat on the mat"
 * 2. regExp: [csm]at
 * "it means "a 'c', an 's', or an 'm', followed by 'at'."
 * 3. enable global search
 * 4. enter "the fat cat in a hat sat on the mat"
 * 5. find "all the "at" words there"
 * 6. [csmfh]at
 * 7. [a-z]at
 * "Regexes are case-sensitive by default, which means "Cat" and "Mat" won’t be matched."
 * "PHP or JavaScript, regexes are written as /[cm]at/, and you need to add "i" after the final slash, like this: /[cm]at/i."
 * 8. [a-zA-Z]at
 * 9. try [Ca-z]at
 * 10. [0-9]
 * 11. [A-Za-z0-9]
 * 12. [A-Za-z_][A-Za-z0-9_] - for valid variable names (aa, a9, _i will match)
 * 13. enter "the fat cat called Pat sat on the mat"
 * 14. try [a-z]at
 * 15. try [^a-z]at // anything that isn’t a lowercase letter, followed by 'at'
 * 16. [A-Za-z_][A-Za-z0-9_] to match variable names, which means the test string must start with a letter of any case or an underscore, followed by a letter of any case or a number or an underscore. That works great if you name all your variables i, aa, or similar, but let’s face it: you probably don’t.
 * 17. quantification: the ability to say how many times something ought to appear.
 * 18. [A-Za-z_][A-Za-z0-9_]* must start with an uppercase or lowercase letter, then zero or more uppercase letters, lowercase letters, numbers, or an underscore
 * 19. + - one or more
 * 20. ? - zero or one
 * 21. try "myVariable"
 * 22. [A-Za-z_][A-Za-z0-9_]+
 * 23. [A-Za-z_][A-Za-z0-9_]?
 * 24. try "i"
 * 
 * Quantifiers
 * 1. Quantifiers aren’t just restricted to character classes. For example, if you wanted to match the word "color" in both US English ("color") and International English ("colour"), you could use the regex colou?r. That is, "match the exact string 'colo', the match zero or one 'u's, then an 'r'."
 * 2. [a-z]{3} match exactly three lowercase letters.
 * 3. try to match "111-1111", not "1111-111" or "111111111"
 * 4. [0-9]{3}-[0-9]{4}
 * 5. [a-z]{1,3} match one, two, or three lowercase letters
 * 6. [a-z]{3,} match at least three, but potentially any number more.
 * 7. colou?r and colou{0,1}r are identical
 * 
 * Meta characters
 * There are several characters that regexes give special meaning, and at least three of them are used extensively.
 * 1. . - will match any single character except a line break
 * 2. c.t will match "cat" but not "cart"
 * 3. .* match one or more of anything that isn’t a line break. Will match almost everything
 * 4. As an example, consider the regex we wrote to match phone numbers like 555-5555: [0-9]{3}-[0-9]{4}. You might think “maybe some people will write "555 5555" or “5555555”, and try to make your regex looser by using .* instead, like this: [0-9]{3}.*[0-9]{4}
 * 5. But now you have a problem: that will match “123-4567”, “123-4567890”, and even “123-456-789012345”. In the first instance, the .* will match “-“; in the second, it will match “-456“; and in the third it will match “-456-78901” – it will take as much as needed in order for the [0-9]{3} and [0-9]{4} matches to work.
 * 6. [0-9]{3}[ -]*[0-9]{4} means “find three digits, then zero or more spaces and dashes, then four digits.
 * 7. You can also use negated character classes to match anything that isn’t a digit, so [0-9]{3}[^0-9]+[0-9]{4} will match a space, a dash, a slash, and more – but it won’t match numbers.
 * 
 * Anchors
 * There are two meta characters used to describe the beginning and end of each line: ^ and $ . These are called anchors, because they are useful to restrict the kind of matches you’re looking for – you literally anchor the match to one or both parts of the input line.
 * 1. enter text "Rincewind
 * The Luggage
 * Twoflower
 * Tiffany Aching
 * Weatherwax
 * Von Lipwig
 * Daft Wullie"
 * 2. ^W.* to match “Weatherwax”
 * 3. make sure you enabled multiline mode
 * 4. try .*g$
 * 
 * Meta sequences
 * Regular expressions have a handful of special characters that can be used in place for character classes. 
 * These meta sequences come in pairs distinguished by letter casing, for example: \w (a lowercase W) means “any word character” is equal to the character class [A-Za-z0-9_], and \W (a capital W) means “the opposite of any word character”. This means [A-Za-z0-9_]* and \w* are identical.
 * Similarly, you have \d to match any digit and \D to match any non-digit, as well as \s to match any whitespace and \S to match any non-whitespace. The whitespace sequence is equivalent to combining all the whitespace meta characters that are used in most programming languages, including \t for “tab”, \n for line break, plus a space.
 * 1. write a regExp that match variables used in programming
 * 2. write a regExp that match a phone number in the format 111-1111
 * 3. write a regExp that match names that follow the format “Yury Shkoda” and “Taylor Swift”.
 * 4. write a regExp that match a book ISBN in the format 1-111111-11-1, where the dashes may or may not be present.
 * 5. \w*
 * 6. [0-9]{3}-[0-9]{4} or \d{3}-\d{4}
 * 7. [A-Z][a-z]+ [A-Z][a-z]+
 * 8. \d{1}-?\d{6}-?\d{2}-?\d{1}
 * 
 * Looking for words
 * 1. \b matches word boundaries
 * 2. \B matches non-word boundaries
 * 3. enter string "I don't want any toast, and he doesn't want any toast. In fact, no-one around here wants any toast. Not now, not ever. No toast."
 * 4. \w+ that meta sequence evaluates to [A-Za-z0-9_], which doesn’t include apostrophes
 * 5. [\w']+ meaning “any word character or apostrophe, repeated one or more times. Doesn’t match is the word “no-one”.
 * 6. [\w'-]+ but "'" can be "`"
 * 7. [\w'’-]+ but what if user enter "1,000,000"
 * 8. [^ ]+ it matches everything that is not a space
 * 9. [^ ]+\b
 * 
 * Grouping
 * if we want to match dates like “April 25th” and “Apr 25”
 * 1. Apri?l? \d\dt?h? wich also accepts "Aprl 25h"
 * A solution is to use grouping, which lets you make sub-expressions inside your regex, then apply a quantifier. To do this, use parentheses. For example, the “il” in April and the “th” in “25th” should either be present in their entirety or not present at all – zero or one matches of that particular text. We write that as (il)? and (th)?, so we can craft a much better regex like this:
 * 2. Apr(il)? \d\d(th)?
 * 3. Enter "April 25th"
 * 4. box marked “Match Information”, showing “il” and “th” – the matches for our two groups.
 * 
 * Grouped alternatives
 * Groups become really powerful when you use them to specify multiple variations. This is done by writing a pipe symbol, |, inside your groups, like this: (foo|bar). That will match either word but not both, so you can allow variation from users within the same regex.
 * 1. You want to parse a sentence of user text that matches the structure “I like paintings by Caravaggio” or “I like sculptures by Rodin”. You don’t know who the artist might be, but you do know that it’s going to be a painting or a sculpture – we don’t want to match “I like music by Sam Smith”.
 * 2. I like paintings by \w+    matches “I like paintings by...”
 * What we have so far will match “I like paintings by Caravaggio” and “I like paintings by Rodin”, but not “I like sculptures by Rodin” – to do that we need a grouped alternative for “paintings”, like this:
 * 3. I like (paintings|sculptures) by \w+
 * 
 * Greedy, lazy, and eager matching
 * Regex engines are considered “eager” because they are programmed to return the first valid match, even if there is a better match available.
 * This is important when working with grouped alternatives, because the regex engine checks them in the order you provide.
 * 1. (get|getName|set|setName) 
 * 2. given the string “setName”, which of those four options do you think will be matched? -- set
 * 3. (getName|get|setName|set) does the same thing as (get|getName|set|setName) but will always match the longest string it can.
 * *, +, ? are also greedy by default, which means they will match as much as possible.
 * 4. enter string "That's it: I'm invoking Space Corp Directive 68250." said Rimmer. "68250?" replied Kryten, "but sir surely that's impossible without at least one live chicken and a rabbi?"
 * 5. try to match “That's it: I'm invoking Space Corp Directive 68250.” and “68250?” and “but sir surely that's impossible without at least one live chicken and a rabbi?”
 * 6. ".*"
 * Lazy matching means “match this thing as few times as possible,” and it’s enabled by adding a question mark to your existing quantifier.
 * 7. ".*?", which means "match a quote, then as few characters as possible before we reach the next quote."
 * 8. as a more precise alternatives we can use "[^”]+" it means “match a quote, then match everything up to the next quote.”
 * 
 * Escape  characters 
 * 1. enter string:
 *      1. Feed cat
 *      2. Organize sock drawer
 *      3. Take over world
 * 2. write regexp to match those lines
 * 3. \d+. [\w ]+
 * Remember, . is actually a meta character that means “anything at all.” It doesn’t have the * quantifier here so it will only match a single character, but in this case it means strings like the below will match:
 * 11 Take over the world
 * 4. \d+\. [\w ]+
 * Escaping is complicated for two reasons. First, the rules for escaping special characters are different depending on whether you’re inside a character class or not. If you are inside a character class, you need to escape the following characters if you want to match them literally: ], \, ^, -. This is because they have special significance inside character classes. Outside of character classes, you need to escape lots more things: ., ^, $, *, +, ?, (, ), [, {, \, and | all must be escaped, because otherwise they have special meanings.
 * Note: If you’re using a language that wraps regexes in delimiters – JavaScript and PHP, for example – you will also need to escape that delimiter. The most common delimiter is /, so you will need to write \/. Regex101 uses / for a delimiter, so this warning applies there too: write \/ on Regex101!
 * The second reason escaping is complicated – and trust me, this bit hurts my brain – is when you use regexes inside programming strings. If you’re solely using them inside a text editor then you have no problem, but when you use them inside a programming language then you need to double escape things.
 * 5. let myString = "\d+\. [\w ]+"
 * most programming languages use \ as their own escape sequence, there’s a problem with that pseudocode: each of those backslashes will be interpreted as an escape sequence in your programming language, rather than than an escape sequence for the regex.
 * 6. let myString = "\\d+\\. [\\w ]+"
 * 7. let myString = "\\\\" to match "\"
 */

/**
 * JS Syntax:
 */

let regExp  = new RegExp("*.", "g");
let matches = "some string".match(regExp);


/**
 * Practice:
 */

// 1
// Write your own version of includes() method on String that ignores letter case, and without using existing includes() method.
// Samples:
    // solution("Hello, world", "Hello")   == true
    // solution("Hello,wo world", "WORLD") == true
    // solution("Hello, world", "Goodbye") == false

function solution1(str1, str2) {
    if (str1.length < str2.length) return false;

    let regExp = new RegExp(str2, "i");
    
    return str1.search(regExp) != -1;
}

// 2
// Write a function that accepts a string, and returns how many times a specific character appears, taking case into account.
// Samples:
//     solution("The rain in Spain", "a")       == 2
//     solution("Mississippi", "i")             == 4
//     solution("Hacking with JavaScript", "i") == 3

function solution2(str1, str2) {
    let regExp = new RegExp(str2, "g");

    return str1.length - str1.replace(regExp, "").length;
}

// 3
// Write a function that returns a string with any consecutive spaces replaced with a single space.
// Samples:
//     solution("a   b   c") === "a b c"
//     solution("    a")     === " a"
//     solution("abc")       === "abc"

function solution3(str) {
    if (str.length == 0) return str;

    let regExp = new RegExp(" +", "g");
    
    return str.replace(regExp, " ");
}

// 4
// Write a function that accepts array of integers that returns the number of times a specific digit appears in any of its numbers.
// Samples:
//     solution([5, 15, 55, "515"], "5") == 6
//     solution([5, 15, 55, 515], "1")   == 2
//     solution([55555], "5")            == 5
//     solution([55555], "1")            == 0

function solution4(array, num) {
    let regExp  = new RegExp(num, "g");
    let matches = array.join("").match(regExp);

    return matches == null ? 0 : matches.length;
}

// 5
// Given a string that contains both letters and numbers, write a function that pulls out all the numbers then returns their sum.
// Samples:
//     solution("a1b2c3")    == 6
//     solution("a10b20c30") == 60
//     solution("cks8al")    == 8

function solution5(str) {
    let regExp  = new RegExp("\\d+", "g");
    let matches = str.match(regExp);
    let sum     = 0;

    for (let i of matches) sum += Number(i);
    
    return sum;
}