export const copyText = (text: string, setText: any) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      setText("Copied");
      setTimeout(() => {
        setText("Copy link");
      }, 3000);
    })
    .catch((err) => {
      console.log(err);
    });
};
