export default function Home() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="divider"> Qr Menüler</div>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
        <div className="group relative card">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-40 ">
            <img
              src="https://images.unsplash.com/photo-1547022145-dfc3f3e1bc03?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGlvbiUyMGNoZXNzfGVufDB8fDB8fHwy"
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="mt-4 flex items-center justify-center">
            <div>
              <h3 className="text-lg text-black">
                <a href="/pionqrmenu">
                  <span aria-hidden="true" className="absolute inset-0" />
                  Pion Cafe
                </a>
              </h3>
            </div>
          </div>
        </div>
        <div className="group relative">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-xl bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-40 ">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStEmHc6V2Ss_p3qTM9VC2OjA-2GFJncgCkjQ&s"
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="mt-4 flex items-center justify-center">
            <div>
              <h3 className="text-lg text-black">
                <a href="#">
                  <span aria-hidden="true" className="absolute inset-0" />
                  Irish Pub
                </a>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
