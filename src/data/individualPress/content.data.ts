import type { IndividualPressContentSection } from "@/types/individualPress/individualPress.types";

const figmaParagraph =
  "Lorem ipsum dolor sit amet consectetur. Id ultrices lorem eu ornare sapien faucibus orci lobortis diam. Dolor at nibh ultrices semper est ultrices eu. Facilisi arcu enim dapibus integer turpis lacus sit. Lectus sem volutpat et dolor ornare mattis erat in. Vitae enim egestas sed erat id id ornare. In nullam aliquam quam cras maecenas donec. Mattis posuere orci nunc nunc mauris pretium. Bibendum nec ac vel consectetur. Neque adipiscing bibendum turpis ipsum. Venenatis suspendisse elit nisi velit cras. Non consequat quam mattis malesuada. Pellentesque molestie bibendum mauris sit egestas enim. Quam tellus eget id volutpat sit adipiscing sit hendrerit consectetur. Vitae pulvinar at nulla nulla facilisis mauris tortor ornare. Ac nibh cras sed suscipit faucibus nisl nisi. Massa velit massa blandit risus pellentesque aliquet. Sit aliquet mollis nunc viverra semper. Egestas congue viverra ipsum egestas eget in volutpat. Aliquet nunc tincidunt consequat lacus eu potenti et.";

export const pressContentFallback: IndividualPressContentSection = {
  content: {
    rendered: `<p>${figmaParagraph}</p><p>${figmaParagraph}</p><p>${figmaParagraph}</p>`,
  },
};
