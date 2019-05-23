/**
 * 1. create a file server.log and enter text:
 * 125.130.217.146 - - [21/Apr/2016:06:27:50 +0000] "GET /buy.html HTTP/1.1" 200 379 "https://www.awesomeinc.com/index.html" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.63 Safari/537.36
 * 2. important part is "GET /buy.html"
 * Now, your company is busy doing some testing to try to improve sales: if they change the text of the “buy” button does it make sales higher or lower? To find out, they wrote some simple code to display eight different pieces of buy text, each linking to the same buy.html file but providing a parameter in the URL: “buy.html?type=1”, “buy.html?type=2”, and so on.
 * After 30 days have passed you have 1,000,000 lines in your web server log, of which about 10,000 contain a reference to “buy.html
 * 3. you need to find all the references to “buy.html” and count which “type” parameter was used most.
 * 4. regexp would look like buy.html\?type=\d
 * 5. for grep we can provide regexp without escaping +, ?, |
 * 6. buy.html?type=\d
 * 7. grep -o "buy.html?type=\d" server.log
 * 8. -o means “output only the part of the line that matches my search.”
 * 9. count various instances to see how often they appear
 * 10. grep -o "buy.html?type=\d" server.log | sort | uniq -c
 * 11. regular grep supports basic regexes with character classes, meta sequences, and *, but egrep turns on the full range of power so you can search using any regex you can think of.
 */