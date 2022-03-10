const { chromium } = require("playwright-chromium");
const { expect } = require("chai");
const { request } = require("http");
const { all } = require("async");

let browser, page; // Declare reusable variables
const data = {
  "d953e5fb-a585-4d6b-92d3-ee90697398a0": {
    author: "J.K.Rowling",
    title: "Harry Potter and the Philosopher's Stone",
  },
  "d953e5fb-a585-4d6b-92d3-ee90697398a1": {
    author: "Svetlin Nakov",
    title: "C# Fundamentals",
  },
};
function json(data){
    return {
        status:200,
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    }
}

describe("tests", async function () {
  this.timeout(6000);
  before(async () => {
    browser = await chromium.launch();
  });

  after(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
  });

  afterEach(async () => {
    await page.close();
  });
  it("load book", async () => {
      await page.route('**/jsonstore/collections/books*',(route,request)=>{
          route.fulfill(json(data))
      })
    
    await page.goto("http://localhost:5500");
    
    await page.click("text=Load All Books");
    await page.waitForSelector("text=Harry Potter");
    const rows = await page.$$eval("tr", (rows) =>
      rows.map((x) => x.textContent.trim())
    );
    expect(rows[1]).to.contains("Harry Potter");
    expect(rows[1]).to.contains("Rowling");
    expect(rows[2]).to.contains("C# Fundamentals");
    expect(rows[2]).to.contains("Nakov");
  });
  it('addBook',async ()=>{
    await page.goto("http://localhost:5500");
    
    await page.fill('form#createForm >> input[name="title"]','Title');
    await page.fill('form#createForm >> input[name="author"]','Author');

    const [request]=await Promise.all([
        page.waitForRequest(request=>request.method()=='POST'),
        page.click('form#createForm >> text=Submit')
    ])
   
     const data2=JSON.parse(request.postData());
     expect(data2.title).to.equal('Title')
     expect(data2.author).to.equal('Author')
  })
});
