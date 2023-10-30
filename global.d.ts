// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       "swiper-container": React.DetailedHTMLProps<
//         React.HtmlHTMLAttributes<HTMLElement>,
//         HTMLElement
//       > & {
//         navigation: string;
//       };
//       "swiper-slide": React.DetailedHTMLProps<
//         React.HtmlHTMLAttributes<HTMLElement>,
//         HTMLElement
//       > & {
//         lazy: string;
//       };
//     }
//   }
// }

declare namespace JSX {
  interface IntrinsicElements {
    "swiper-container": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      navigation: string;
      // Add more properties
    };
    "swiper-slide": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      lazy: string;
      // Add more properties
    };
  }
}
