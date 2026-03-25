export const handleNavigate = (id: string) => {
  const element = document.getElementById(id);

  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  } else {
    window.location.assign(`/#${id}`);
  }
};
