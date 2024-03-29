//#region pageContentNames
const pageContent = [
  {
    "page": "INTERNET",
    "root": false,
    "basePage": ["page8498574.html"],
    "forHide": [
      ".t396",
      "#rec150333633",
      "#rec150338650",
      "#rec150333603"
    ],
    "keysForReDefine": [],
    "valuesForReDefine": [],
    "toAdd": [
      {
        "id": "imageIndex_2",
        "where": "#t-footer",
        "img": "images/backgrIndex.png",
        "href": "page8498574.html"
      }
    ]
  },
  {
    "page": "TV",
    "root": false,
    "basePage": ["page8629852.html"],
    "forHide": [
      ".t396",
      "#rec153306226"
    ],
    "keysForReDefine": [],
    "valuesForReDefine": [],
    "toAdd": [
      {
        "id": "imageIndex_3",
        "where": "#t-footer",
        "img": "images/backgrTV.png",
        "href": "page8629852.html"
      }
    ]
  },
  {
    "page": "Redirect",
    "root": false,
    "basePage": ["redirect.html"],
    "forHide": [
      ".t396",
      "#rec153306226"
    ],
    "keysForReDefine": [],
    "valuesForReDefine": [],
    "toAdd": [
      {
        "id": "imageIndex_4",
        "where": "#t-footer",
        "img": "images/backgrRdrct.png",
        "href": "redirect.html"
      }
    ]
  },
  {
    "page": "SILVER-DRONES",
    "root": true,
    "basePage": ["silver-drones.html"],
    "forHide": [
      ".t396",
      "#rec153306226"
    ],
    "keysForReDefine": [],
    "valuesForReDefine": [],
    "toAdd": [
      {
        "id": "imageIndex_5",
        "where": "#t-footer",
        "img": "images/backgrDrones.png",
        "href": "silver-drones.html"
      }
    ]
  }, {
    "page": "НОВИНИ",
    "root": false,
    "basePage": ["page8629856.html'"],
    "forHide": [],
    "keysForReDefine": [],
    "valuesForReDefine": [],
    "toAdd": []
  },
  {
    "page": "SILVER_SERVICE",
    "root": false,
    "basePage": ["index.html"],
    "forHide": ["div[field='tn_text_1578322192366']",
      "[id ^= 'rec149442898']",
      "[id ^= 'rec149504840']",
      "[id ^= 'rec149521426']",
      ".owl-stage-outer"
    ],
    "keysForReDefine": [".t-feed__post-preloader__textwrapper"],
    "valuesForReDefine": ["font-size: 14px"],
    "toAdd": [
      {
        "id": "imageIndex_1",
        "where": "[id ^= 'rec153154582']",
        "img": "images/backgrIndex.png",
        "href": "index.html"
      }
    ]
  },
]
//#endregion

const menuBtn = document.querySelector('.menu-btn')
const hamburger = document.querySelector('.menu-btn__burger')
const nav = document.querySelector('.nav')
const menuNav = document.querySelector('.menu-nav')
const navItems = document.querySelectorAll('.menu-nav__item')
const tHeader = document.querySelector("#t-header")
const popup = document.querySelector("#popup-bm")
const submitButton = document.querySelector('.t-submit')

let showMenu = false
let creditLink = null
let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;

choiceHeader()

window.addEventListener('resize', choiceHeader)
submitButton.addEventListener('click', handleSubmitButton)

function removeCreditLink() {
  creditLink = document.getElementById('goOnItem')
  creditLink.style.display = 'none'
}

function choiceHeader() {
  if (window.innerWidth > 768) {
    showMenu = false
    tHeader.removeAttribute("hidden")
    menuNav.setAttribute("hidden", "hidden")
    menuBtn.setAttribute("hidden", "hidden")
    popup.setAttribute("hidden", "hidden")
    toggleMenu()
  } else {
    showMenu = true
    tHeader.setAttribute("hidden", "hidden")
    menuNav.removeAttribute("hidden")
    menuBtn.removeAttribute("hidden")
    popup.removeAttribute("hidden")
    toggleMenu()
    launchPageRebuilding()
  }
}

//#region toggleMenu
menuBtn.addEventListener('click', toggleMenu)


function toggleMenu() {
  let tumbler = menuBtn.getAttribute("aria-expanded")
  for (const page of pageContent) {
    for (const basePage of page.basePage) {
      if (window.innerWidth < 769 && window.location.pathname.includes(basePage)) {
        tumbler = "true"
        break
      }
    }
  }

  switch (tumbler) {
    case "true":
      menuNav.removeAttribute("hidden")
      break
    case "false":
      menuNav.setAttribute("hidden", "hidden")
      break
    case null:
      menuNav.setAttribute("hidden", "hidden")
      break
    default:
      menuNav.setAttribute("hidden", "hidden")
      break
  }

  if (!showMenu) {
    hamburger.classList.add('open')
    nav.classList.add('open')
    menuNav.classList.add('open')
    menuBtn.classList.toggle("active")
    menuBtn.setAttribute("aria-expanded", "false")
    navItems.forEach(item => item.classList.add('open'))
    popup.classList.toggle("open")
    popup.appendChild(menuNav)
    showMenu = true
  } else {
    hamburger.classList.remove('open')
    nav.classList.remove('open')
    menuNav.classList.remove('open')
    menuBtn.setAttribute("aria-expanded", "true")
    navItems.forEach(item => item.classList.remove('open'))
    showMenu = false
  }

}
//#endregion 


//#region rewriteForAdaptuve

//#region hidingElements
function hideDivs() {
  for (const page of pageContent) {
    for (const basePage of page.basePage) {
      if (window.location.pathname.includes(basePage) || exceptionForRootPage(page.root)) {
        for (let element of page.forHide) {
          try {
            let elements = document.querySelectorAll(element)
            for (let elem of elements) {
              if (elem != null) elem.setAttribute("style", "display: none")
            }
          } catch (error) { console.log(error) }
        }
        return
      }
    }
  }
}
//#endregion

//#region reDefineElements
function reDefineDivs() {

  for (const page of pageContent) {
    for (const basePage of page.basePage) {
      if (window.location.pathname.includes(basePage) || exceptionForRootPage(page.root)) {
        let i = 0
        for (let element of page.keysForReDefine) {
          i++
          try {
            let elements = document.querySelectorAll(element)
            for (let elem of elements) {
              if (elem != null) elem.setAttribute("style", page.valuesForReDefine[i - 1])
            }
          } catch (error) { console.log(error) }
        }
        for (let element of page.toAdd) {
          let where = document.querySelector(element.where)
          if (where == null) continue
          let img = document.createElement("img")
          let a = document.createElement("a")
          a.id = element.id
          a.href = element.href
          a.style.display = "flex"
          img.style.width = "100%"
          img.src = element.img
          if (document.querySelector(`[id ^= '${element.id}']`) == null) {
            where.insertAdjacentElement("beforebegin", a)
            a.appendChild(img)
          }
        }
        return
      }
    }
  }
}

function exceptionForRootPage(pageRoot) {
  return window.location.pathname === "/" && pageRoot
}
//#endregion

function handleSubmitButton(event) {
  event.preventDefault()
  const phone = this.form.elements["Phone"].value
  const name = this.form.elements["Name"].value

  if (phone !== '' && name !== '') {
    console.log('Button clicked! Phone number: ' + phone + ' Name: ' + name)

    const xhr = new XMLHttpRequest()
    const url = 'http://' + window.location.hostname + ':8000/submit-form/'
    const data = JSON.stringify({ phone, name })

    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        console.log('Form data sent successfully!')
      } else {
        console.error('Form data sending failed.')
      }
    }

    xhr.send(data)
  }
}

//#region calls
function launchPageRebuilding() {
  hideDivs()
  reDefineDivs()
}
//#endregion

//#region forRedirect
async function getInvoiceFromRedirectAPI() {
  let errorOccurred = false;

  for (const redirectApiHost of redirectApiHosts) {
    try {
      const confirmation = confirm("Ви впевнені, що хочете виконати цю дію?");
      if (!confirmation) {
        console.log("The action canceled by user!");
        return; // отмена действия
      }

      const apiAddress = `https://${redirectApiHost}:8002/redirect-api/get-invoice/`;

      const response = await fetch(apiAddress, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
      });

      if (!response.ok) {
        console.log(`Request: ${response.status}`);
        continue;
      }

      const contentType = response.headers.get("Content-Type");

      if (contentType === "application/pdf") {
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        window.open(objectUrl, "_blank");
        console.log("Запрос на получение счета выполнен успешно.");
        alert("Запит виконаний успішно! Передивиться каталог завантажень");
        break;
      } else {
        throw new Error(`Incorrect content type: ${contentType}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Помилка при отриманні рахунку. Будь ласка, спробуйте ще раз пізніше.');
    }
  }
}

async function goOn_RedirectAPI() {
  for (const redirectApiHost of redirectApiHosts) {
    try {
      const confirmation = confirm("Ви впевнені, що хочете виконати цю дію?");
      if (!confirmation) {
        console.log("The action canceled by user!");
        return;
      }

      const apiAddress = `https://${redirectApiHost}:8002/redirect-api/service-go-on/`

      const response = await fetch(apiAddress, {
        method: "GET", mode: "cors", cache: "no-cache"
      })

      if (!response.ok) {
        console.log(`Request: ${response.status}`)
        continue
      } else {
        if (window.innerWidth > 768) {
          const buttonElement = document.querySelector('.t-btn.t393__submit')
          buttonElement.style.display = 'none'
          const messageElement = document.createElement('div')
          messageElement.textContent = 'Готово. Послугу тимчасово відновлено'
          messageElement.style.backgroundColor = '#1c008a'
          messageElement.style.color = 'orange'
          messageElement.style.fontSize = '22px'
          messageElement.style.padding = '10px'
          messageElement.style.borderRadius = '5px'
          const buttonParent = buttonElement.parentNode
          buttonParent.insertBefore(messageElement, buttonElement.nextSibling)
          console.log("Запрос на продолжение выполнен успешно.");
          alert("Запит виконаний успішно! Послугу тимчасово відновлено");
          break
        } else {
          removeCreditLink()
          console.log("Запрос на продолжение выполнен успешно.");
          alert("Запит виконаний успішно! Послугу тимчасово відновлено");
          break
        }
      }
    } catch (error) {
      console.error('Error:', error)
      alert('На жаль, виникла помилка при виконанні запиту. Будь ласка, спробуйте ще раз пізніше.');
    }
  }
}




function goToBankFill() {
  window.location.href = bank4Drones_address
}
//#endregion

//#region showSlides
function showSlides() {
  slides.forEach(slide => {
    slide.style.display = 'none';
  });
  const currentSlide = slides[slideIndex];
  currentSlide.style.display = 'block';
}

function nextSlide() {
  slideIndex++;
  if (slideIndex >= totalSlides) slideIndex = 0;
  showSlides();
}

function prevSlide() {
  slideIndex--;
  if (slideIndex < 0) slideIndex = 0;
  showSlides();
}
//#endregion