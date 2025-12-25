import { parseDecklist } from "../utils/csvDecklistParser";

async function main() {
    try {
        const cards = await parseDecklist("/home/pascal/projects/mtg-playgroup-tracker/backend/dev_data/azula.csv");
        console.log(cards);
      } catch (err) {
        console.error("Parsing error:", err);
      }
}
main();