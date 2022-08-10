interface ContentWrapperBodyProps {
  children: React.ReactNode | React.ReactNode[];
}

const ContentWrapperBody = ({ children }: ContentWrapperBodyProps) => {
  return <div className="px-8 py-7">{children}</div>;
};

export default ContentWrapperBody;
