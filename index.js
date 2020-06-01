(function () {
  const BASE_URL = 'https://movie-list.alphacamp.io/'
  const INDEX = 'api/v1/'
  const POSTERS = 'posters/'
  const displayPanel = document.querySelector('.display-panel')
  const nav = document.querySelector('.nav')
  const genres = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }
  let rawData = []

  // 顯示導覽列
  let navHTML = ``
  for (item in genres) {
    navHTML += `
      <li class="nav-item">
        <a class="nav-link" href="#" data-id="${item}">${genres[item]}</a>
      </li>
    `
  }
  nav.innerHTML = navHTML

  // 取得資料
  axios.get(BASE_URL + INDEX + 'movies')
    .then((response) => {
      rawData = response.data.results
      // 預設 hilight Action
      nav.firstElementChild
        .firstElementChild.classList.add('active')

      const filterAction = filterDataByGenres(1)
      displayMovies(filterAction)
    })
    .catch((err) => console.log(err))

  function displayMovies(data) {
    let contentHTML = ``
    data.forEach(item => {
      contentHTML += `
        <div class="col-4 mb-3">
          <div class="card">
            <img src="${BASE_URL}${POSTERS}${item.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              ${displayGenres(item.genres)}
            </div>
          </div>
        </div>
      `
    })
    displayPanel.innerHTML = contentHTML
  }

  function displayGenres(array) {
    let genresHTML = ``
    array.forEach(item => {
      genresHTML += `
        <span class="badge badge-secondary">${genres[item]}</span>
      `
    })
    return genresHTML
  }

  function filterDataByGenres(genresNumber) {
    const genresId = Number(genresNumber)
    console.log(genresId)
    const result = rawData.filter(item => {
      // 電影是否包含該類型
      const isGenres = item.genres.some(item => { return item === genresId })
      return isGenres
    })
    return result
  }

  // hilight 所選的導覽項目
  nav.addEventListener('click', () => {
    // 先清除所有 active class
    const navLinkArray = document.querySelectorAll('.nav-link')
    navLinkArray.forEach(item => {
      item.classList.remove('active')
    })
    // hilight 選項
    event.target.classList.add('active')
    // filter display
    const genresId = event.target.dataset.id
    const filterData = filterDataByGenres(genresId)
    displayMovies(filterData)
  })
})()
