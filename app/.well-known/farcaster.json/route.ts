import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    accountAssociation: {
      header: "eyJmaWQiOjMxMDgxNSwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweEJCNzQyM2NmNTc0NTlCRWQ4YjM2NDlEODgwMzlBOGUxMzBmN2Y0OEQifQ",
      payload: "eyJkb21haW4iOiJ2MC1teW1hcmtldG1vb2QudmVyY2VsLmFwcCJ9",
      signature: "yWklO5O9aSULzTaGyD+PXYKu+ExI4WPz9BDSs8UcTngbcLQnRf27BbXZlPW6DiXBRaI+FgPR+zvedB/oQ2OzHhs=",
    },
    // ❌ УБРАЛ frame объект 
    miniapp: {  // ✅ Только miniapp для Base App
      version: "1",
      name: "Market Mood Today",
      short_name: "Market Mood",
      description: "Your current state based on today's market and on-chain identity",
      homeUrl: "https://v0-mymarketmood.vercel.app/",
      iconUrl: "https://v0-mymarketmood.vercel.app/icon-512.png",
      splashImageUrl: "https://v0-mymarketmood.vercel.app/splash.png",
      splashBackgroundColor: "#000000",
      screenshotUrls: [  // ✅ Base App ТРЕБУЕТ скрины!
        "https://v0-mymarketmood.vercel.app/screenshot1.png",
        "https://v0-mymarketmood.vercel.app/screenshot2.png",
        "https://v0-mymarketmood.vercel.app/screenshot3.png"
      ],
      primaryCategory: "utility",
      tags: ["market", "mood", "onchain", "identity", "base"],
    },
  })
}
