let input = document.querySelector('input')
let card = document.querySelector('.card')

let user = async () => {
  let resp = await fetch(`https://api.github.com/users/${input.value}`)
  let respData = await resp.json()
  return respData
}

let search = async () => {
  let input_val = input.value
  let search_result = await user(input_val)

  input.value = ""

  if (!search_result.login) {
    Swal.fire({
      icon: "error",
      title: "Not User Found",
      showClass: {
        popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
      },
      hideClass: {
        popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
      }
    });

  } else {
    card.innerHTML = `
          <div class="avatar">
              <img src="${search_result.avatar_url}" alt="">
          </div>
          <div class="info">
              <h2>${search_result.name}</h2>
              <p>${search_result.login}</p>
              <p>${search_result.bio}</p>
              <div class="follow-info">
                  <div class="single">
                      <span>( ${search_result.followers} )</span>
                      <span>Followers</span>
                  </div>
                  <div class="single">
                      <span>( ${search_result.following} )</span>
                      <span>Following</span>
                  </div>
              </div>
              <div class="single">
                  <span>( ${search_result.public_repos} )</span>
                  <span>Repositories</span>
              </div>
          </div>
          <a href="${search_result.html_url}" target="_blank">Visit Github Profile ></a>
      `
  }

}