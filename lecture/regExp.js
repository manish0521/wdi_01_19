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
 * /