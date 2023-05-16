interface BaseLayoutProps {
	children: JSX.Element[] | JSX.Element;
}

function BaseLayout({ children }: BaseLayoutProps) {
	return (
		<div className="
        w-screen
        h-screen
		grid
		grid-rows-[50px_1fr]
      from-amber-200
      to-orange-200
        bg-gradient-to-tl
      ">
			{children}
		</div>
	);
}

export default BaseLayout;
