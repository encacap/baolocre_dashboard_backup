interface ContentWrapperBodyTitleProps {
  children: string;
}

const ContentWrapperBodyTitle = ({ children }: ContentWrapperBodyTitleProps) => {
  return <div className="text-lg font-semibold text-teal-600">{children}</div>;
};

export default ContentWrapperBodyTitle;
