import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    frame: {
      version: "vNext",
      image: "https://v0-mymarketmood.vercel.app/opengraph-image.png",
      imageAspectRatio: "1.91:1",
      buttons: [
        {
          label: "Open Market Mood",
          action: "post",
          target: "https://v0-mymarketmood.vercel.app/",
        },
      ],
    },
  })
}
