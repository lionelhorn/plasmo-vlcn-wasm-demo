import initWasm from "@vlcn.io/crsqlite-wasm";
import wasmUrl from "raw:@vlcn.io/crsqlite-wasm/crsqlite.wasm";

(async () => {
	const sqlite = await initWasm(() => wasmUrl);

	const db = await sqlite.open("database.db");
	await db.exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, name TEXT)");

	const stmt = await db.prepare("INSERT OR IGNORE INTO users (name) VALUES (?)");
	await stmt.run(db, `John Do. Born at ${new Date().toTimeString()}`);

	const users = await db.execA<[bigint, string]>("SELECT * FROM users");
	console.log("Saved users", users);
})()
