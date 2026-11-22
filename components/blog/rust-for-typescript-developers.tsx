import { CodeBlock } from "./code-block";

const tsMove = `const a = { name: "kiki" };
const b = a;
b.name = "x";
console.log(a.name); // "x" — two names, one object`;

const rustMove = `let a = String::from("kiki");
let b = a;          // a moved into b
println!("{a}");    // compile error: a was moved
let c = b.clone();  // explicit copy`;

const tsShape = `type Shape =
  | { kind: "circle"; r: number }
  | { kind: "rect"; w: number; h: number };

function area(s: Shape) {
  switch (s.kind) {
    case "circle": return Math.PI * s.r ** 2;
    case "rect":   return s.w * s.h;
  }
}`;

const rustShape = `use std::f64::consts::PI;

enum Shape {
    Circle { r: f64 },
    Rect { w: f64, h: f64 },
}

fn area(s: &Shape) -> f64 {
    match s {
        Shape::Circle { r } => PI * r * r,
        Shape::Rect { w, h } => w * h,
    }
}`;

const rustBorrow = `fn shout(s: &str) -> String {
    s.to_uppercase()
}

fn push_bang(s: &mut String) {
    s.push('!');
}

let mut name = String::from("rust");
let loud = shout(&name);      // shared borrow
push_bang(&mut name);         // exclusive borrow`;

const rustResult = `fn read_port(path: &str) -> Result<u16, Box<dyn std::error::Error>> {
    let text = std::fs::read_to_string(path)?;
    let port = text.trim().parse::<u16>()?;
    Ok(port)
}`;

const rustTrait = `trait Describe {
    fn describe(&self) -> String;
}

impl Describe for Shape {
    fn describe(&self) -> String {
        format!("area {:.2}", area(self))
    }
}

fn log_all<T: Describe>(items: &[T]) {
    for item in items {
        println!("{}", item.describe());
    }
}`;

const translationRows: [string, string, string][] = [
  ["const x = 5", "let x = 5;", "Immutable by default"],
  ["let x = 5", "let mut x = 5;", "Mutation is opt-in"],
  ["number", "i32, i64, u8, usize, f64…", "Pick a size; no implicit casts"],
  ["string", "String / &str", "Owned vs borrowed"],
  ["T[]", "Vec<T> / &[T]", "Growable vs slice view"],
  ["Map<K, V>", "HashMap<K, V>", "From std::collections"],
  ["interface / type (shape)", "struct", "Nominal, not structural"],
  ["interface (behavior)", "trait", "Implemented explicitly with impl"],
  ["type A = B | C", "enum", "Variants can carry data"],
  ["switch / narrowing", "match", "Must cover every case"],
  ["T | undefined", "Option<T>", "Some(v) or None"],
  ["throw / try", "Result<T, E> + ?", "Errors are return values"],
  ["(x) => x * 2", "|x| x * 2", "Closures"],
  ["arr.map().filter()", "v.iter().map().filter().collect()", "Lazy until collect"],
  ["class + extends", "struct + impl + traits", "No inheritance; compose"],
  ['import { a } from "./m"', "use crate::m::a;", "Files declared via mod"],
];

const toolingRows: [string, string][] = [
  ["npm / pnpm, package.json", "cargo, Cargo.toml"],
  ["npmjs.com", "crates.io (docs on docs.rs)"],
  ["tsc + VS Code TS server", "rustc + rust-analyzer"],
  ["ESLint", "cargo clippy"],
  ["Prettier", "cargo fmt"],
  ["Jest / Vitest", "cargo test (built in)"],
  ["ts-node / npm run dev", "cargo run"],
  ["tsc --noEmit", "cargo check (fast; run it constantly)"],
];

export default function RustForTypeScriptDevelopers() {
  return (
    <div className="post-body">
      <p>
        Rust has a reputation for being hard, but most of that difficulty is concentrated in a
        small, learnable set of ideas. If you already write TypeScript, you are closer than you
        think. Roughly 70% of what you know — types, generics, closures, iterators, modules,
        async/await — carries over almost unchanged. The other 30% is a genuinely different model:
        ownership instead of a garbage collector, no null, no exceptions, and a compiler that treats
        your types as a contract rather than a suggestion.
      </p>
      <p>
        This is the guide I would hand to a TypeScript developer who wants to actually get good at
        Rust, not just dabble. It maps the familiar parts, explains the parts that do not map, and
        ends with a four-week plan.
      </p>

      <h2>Start with what you already know</h2>
      <p>
        The fastest way to read Rust is as a dialect of the language you already speak. The table
        below covers the syntax you reach for every day.
      </p>
      <div className="post-table-wrap">
        <table className="post-table">
          <thead>
            <tr>
              <th>TypeScript</th>
              <th>Rust</th>
              <th>What changes</th>
            </tr>
          </thead>
          <tbody>
            {translationRows.map(([ts, rust, note]) => (
              <tr key={ts}>
                <td>
                  <code>{ts}</code>
                </td>
                <td>
                  <code>{rust}</code>
                </td>
                <td>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Two rows deserve a second look. <code>interface</code> splits in two: a shape becomes a{" "}
        <code>struct</code>, and behavior becomes a <code>trait</code>. And{" "}
        <code>type A = B | C</code> becomes an <code>enum</code>, except the variants can carry data
        — which is what makes Rust&apos;s enums more powerful than a TypeScript union of object
        literals.
      </p>

      <h2>Cargo replaces six tools at once</h2>
      <p>
        One of the nicest surprises is the tooling. The JavaScript ecosystem spreads this work
        across npm, a bundler, a linter, a formatter, a test runner, and a typechecker. Rust ships
        one toolchain, installed with <code>rustup</code>, and it covers all of it.
      </p>
      <div className="post-table-wrap">
        <table className="post-table">
          <thead>
            <tr>
              <th>JS / TS world</th>
              <th>Rust</th>
            </tr>
          </thead>
          <tbody>
            {toolingRows.map(([js, rust]) => (
              <tr key={js}>
                <td>
                  <code>{js}</code>
                </td>
                <td>
                  <code>{rust}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Run <code>cargo check</code> constantly. It is fast, and it is the closest thing Rust has to
        a conversation with the compiler.
      </p>

      <h2>The part that is actually new</h2>

      <h3>Ownership</h3>
      <p>
        Every value has exactly one owner. When the owner goes out of scope, the value is freed.
        That single rule replaces the garbage collector. Assigning or passing a heap value moves it,
        and the old variable stops being usable.
      </p>
      <p>In TypeScript, two names can point at one object:</p>
      <CodeBlock label="TypeScript" code={tsMove} />
      <p>In Rust, the same lines do not compile:</p>
      <CodeBlock label="Rust" code={rustMove} />
      <p>
        Small fixed-size types — <code>i32</code>, <code>bool</code>, <code>char</code> — are{" "}
        <code>Copy</code> and don&apos;t move. The shared mutable state that produced the TypeScript
        surprise above is ruled out at compile time, not by convention.
      </p>

      <h3>Borrowing</h3>
      <p>
        You can have many readers (<code>&amp;T</code>) or one writer (<code>&amp;mut T</code>) at a
        time, never both. Borrowing lets a function use a value without taking ownership of it.
      </p>
      <CodeBlock label="Rust" code={rustBorrow} />
      <p>
        Two habits make this painless. Take <code>&amp;str</code> in parameters and return or store{" "}
        <code>String</code>. And treat <code>.clone()</code> as a legitimate escape hatch while you
        are learning — optimize later.
      </p>
      <p>
        Lifetimes (<code>&apos;a</code>) are annotations that tell the compiler a reference
        won&apos;t outlive its data. You will rarely write one in your first month.
      </p>

      <h3>Enums and match</h3>
      <p>
        Rust enums are TypeScript discriminated unions, with the compiler making sure you handle
        every case. Here is the same area function on both sides.
      </p>
      <CodeBlock label="TypeScript" code={tsShape} />
      <CodeBlock label="Rust" code={rustShape} />
      <p>
        In TypeScript the switch is a suggestion; add a variant and the compiler may never notice.
        In Rust, <code>match</code> is exhaustive — add a variant and every <code>match</code> over
        it fails to compile until you decide what to do. The first few times this happens it feels
        like a scolding. Then it starts to feel like a safety net.
      </p>

      <h3>Errors without throw</h3>
      <p>
        Functions that can fail return <code>Result&lt;T, E&gt;</code>. The <code>?</code> operator
        returns the error to the caller early, a little like an <code>await</code> that rethrows —
        except it is visible in the type signature, so you cannot forget it.
      </p>
      <CodeBlock label="Rust" code={rustResult} />
      <p>
        <code>unwrap()</code> crashes on error. Use it in prototypes and tests, not in shipped code.
        In real applications, reach for <code>anyhow</code> in app code and <code>thiserror</code>{" "}
        for library error types.
      </p>

      <h3>Traits are interfaces with teeth</h3>
      <p>
        A trait defines behavior, and any type can implement it — including types you did not write.
        Generics are constrained by traits, which is <code>&lt;T extends X&gt;</code> with a bit
        more muscle.
      </p>
      <CodeBlock label="Rust" code={rustTrait} />
      <p>
        <code>#[derive(Debug, Clone, PartialEq)]</code> auto-implements the common traits, so{" "}
        <code>{'println!("{:?}", x)'}</code> just works. Duck typing does not exist here: a struct
        with exactly the right fields still has to <code>impl</code> the trait.
      </p>

      <h3>Async is different</h3>
      <p>
        There is no built-in event loop. You choose a runtime — almost always <code>tokio</code>.
        Futures are lazy: nothing runs until you <code>.await</code> or spawn them, unlike
        JavaScript Promises, which start running the moment you create them.
      </p>
      <p>
        Learn synchronous Rust first. Async adds lifetimes and <code>Send</code> bounds on top of
        everything else, and it is a bad place to be confused about two things at once.
      </p>

      <h2>A four-week plan</h2>
      <p>
        The plan assumes a few hours a week and a willingness to be bad at something for two of
        them.
      </p>

      <h3>Week 1 — Basics (~6 hrs)</h3>
      <p>
        Read <em>The Rust Programming Language</em> — everyone just calls it &ldquo;the Book&rdquo;
        — chapters 1 through 6, and do Rustlings alongside it. Install with <code>rustup</code> and
        add <code>rust-analyzer</code> to VS Code. The goal is to be comfortable with{" "}
        <code>let mut</code>, structs, enums, <code>match</code>, and the move error. Skim chapter
        4, on ownership, twice. Everything after it depends on that chapter.
      </p>

      <h3>Week 2 — Real types (~6 hrs)</h3>
      <p>
        Chapters 7 through 10: modules, collections, error handling, generics, traits. Then port a
        small TypeScript utility you have already written — a CSV parser, a todo CLI, anything with
        a main function — to Rust. Run <code>cargo clippy</code> on it. The suggestions teach
        idiomatic Rust faster than any tutorial.
      </p>

      <h3>Week 3 — Idioms (~6 hrs)</h3>
      <p>
        Chapters 13 (closures and iterators) and 15 (smart pointers), plus Exercism&apos;s Rust
        track for mentored practice. Learn <code>Box</code>, <code>Rc</code>, <code>RefCell</code>,
        and <code>Arc&lt;Mutex&gt;</code> — these are what you reach for when single ownership does
        not fit. Then rewrite your Week 2 loops as iterator chains.
      </p>

      <h3>Week 4 — Ship something (~8 hrs)</h3>
      <p>Pick a project that plays to your TypeScript background. Three that tend to work well:</p>
      <ul>
        <li>
          <strong>CLI tool:</strong> <code>clap</code> + <code>serde</code> + <code>anyhow</code>.
          The easiest first win.
        </li>
        <li>
          <strong>Web API:</strong> <code>axum</code> + <code>tokio</code> + <code>serde_json</code>
          . It feels like Express, but with types.
        </li>
        <li>
          <strong>Speed up a JS app:</strong> compile Rust to WebAssembly with{" "}
          <code>wasm-bindgen</code>, or write Node addons with <code>napi-rs</code>.
        </li>
      </ul>
      <p>
        When you get stuck — and you will — the references worth keeping open are{" "}
        <em>Rust by Example</em>, Google&apos;s Comprehensive Rust course, and <code>docs.rs</code>{" "}
        for whatever crate you are using.
      </p>

      <h2>Habits to unlearn</h2>
      <p>The traps below are not subtle. Every TypeScript developer hits them.</p>
      <ul>
        <li>
          <strong>Building object graphs with back-references.</strong> Parent ↔ child pointers
          fight ownership. Use IDs into a <code>Vec</code> or <code>HashMap</code> instead.
        </li>
        <li>
          <strong>Reaching for inheritance.</strong> Use traits and composition. There is no{" "}
          <code>extends</code>.
        </li>
        <li>
          <strong>Treating compiler errors as noise.</strong> Rust&apos;s errors usually include the
          fix. Read the whole message.
        </li>
        <li>
          <strong>Fighting the borrow checker for hours.</strong> <code>.clone()</code>,
          restructure, and move on. Mastery comes from volume, not from winning a single argument.
        </li>
        <li>
          <strong>Overusing escape hatches.</strong> <code>unsafe</code> and <code>dyn Any</code>{" "}
          exist, but you almost never need them.
        </li>
      </ul>

      <p>
        The first two weeks are the hard part, and it is not the syntax. It is letting go of the
        habit of running the code to find out what it does. Rust tells you at compile time instead,
        and once that stops feeling like an argument and starts feeling like a fast feedback loop,
        the language opens up. By week four you will have shipped something small. That is the
        point. Momentum matters more than the project.
      </p>
    </div>
  );
}
