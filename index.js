const url = "https://api.github.com/users";
const searchInputEl = document.getElementById("searchinput");
const searchBtnEl = document.getElementById("search-btn");
const profileContainerEl = document.getElementById("profileContainer");
const loadingEl = document.getElementById("loading");

const generateProfile = (profile) => {
  return `<div class="profile-box">
      <div class="top-section">
        <div class="left">
          <div>
            <img class="avatar" src="${profile.avatar_url}" alt="" />
          </div>
          <div class="self">
            <h3>${profile.name}</h3>
            <h5>${profile.login}</h5>
          </div>
        </div>
        <div class="right">
          <a href="${profile.repos_url}" >
          <button class="primary-btn">Check Profile</button></a>
        </div>
      </div>
      <div class="about">
        <h2>About</h2>
        <p>${profile.bio}</p>
      </div>
      <div class="status">
        <div class="status_item">
          <h3>Followers</h3>
          <p>${profile.followers}</p>
        </div>
        <div class="status_item">
          <h3>Following</h3>
          <p>${profile.following}</p>
        </div>
        <div class="status_item">
          <h3>Repos</h3>
          <p>${profile.public_repos}</p>
        </div>
      </div>
    </div>`;
};

const fetchProfile = async () => {
  const username = searchInputEl.value;
  loadingEl.innerText = "loading...";
  loadingEl.style.color = "black";
  try {
    const response = await fetch(`${url}/${username}`);
    const data = await response.json();

    if (data.bio) {
      loadingEl.innerHTML = "";
      profileContainerEl.innerHTML = generateProfile(data);
    } else {
      loadingEl.innerHTML = data.message;
      loadingEl.style.color = "red";
      profileContainerEl.innerText = "";
    }

    console.log(data);
  } catch (error) {
    console.log(error);
    loadingEl.innerHTML = "";
  }
};

searchBtnEl.addEventListener("click", fetchProfile);
