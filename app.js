const whiteboard_btn = document.getElementById("whiteboard")
const modal_container = document.getElementById("modal_container")
const close_modal_btn = document.getElementById("close_modal_btn")
const worksheet_preview = document.querySelector(".worksheet_preview")
const img_wrap = document.querySelector(".worksheet_preview .img_wrap")

const lastSelectedUnit =
  "https://worksheets.mathsbuilder.com.au/worksheets/Language+cards/3/3_01"
const postFixURL = "/z/1024/whiteboard.jpg"
const sampleTempURL = "https://source.unsplash.com/random/724x1024"

whiteboard_btn.addEventListener("click", () => {
  modal_container.classList.remove("hidden")
})

close_modal_btn.addEventListener("click", () => {
  modal_container.classList.add("hidden")
})

let imageObj, checkBool

const loadImage = (url) => {
  ;(async () => {
    // console.log("loading: " + image + " url " + imageUrl)
    const img = new Image()
    img.setAttribute("crossOrigin", "anonymous")
    img.src = url
    img.classList.add("preview_img")
    img.id = "preview_img"
    await img.decode()

    // img is ready to use
    console.log(img.classList[0] + " has been loaded")
    console.log(
      img.classList[0] + " x: " + img.naturalWidth + ", y:" + img.naturalHeight
    )
    imageObj = img
    checkBool = true
    // console.log(imageObj)
    img_wrap.appendChild(imageObj)
  })()
}

// loadImage(lastSelectedUnit + postFixURL)
loadImage(sampleTempURL)

const checkInterval = setInterval(() => {
  if (checkBool) {
    document.querySelector(".preview_preloader").classList.add("hidden")
    clearInterval(checkInterval)
  }
}, 200)

document.getElementById("fullscreen_btn").addEventListener("click", () => {
  goFullScreen()
})

document.getElementById("print_btn").addEventListener("click", () => {
  printAsPDF()
})

img_wrap.addEventListener("click", () => {
  goFullScreen()
})

const goFullScreen = () => {
  if (checkBool) {
    if (screenfull.isEnabled) {
      screenfull.toggle(img_wrap)
    } else {
      console.error("Fullscreen is disabled on your browser")
    }
  } else {
    console.error("Please wait while your image loads")
  }
}

const printAsPDF = () => {
  if (checkBool) {
    printJS({
      printable: "preview_img",
      type: "html",
      style:
        "html {height: 100%; display: grid; place-items: center;} #preview_img, img { max-height:95vh; }",
    })
  } else {
    console.error("Please wait while your image loads")
  }
}
