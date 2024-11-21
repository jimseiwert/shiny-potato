import Image from 'next/image'

const footerNavigation = {
    useful: [
      { name: 'Illinois Rifle Association', href: 'https://www.isra.org/' },
      { name: 'National Rifle Association', href: 'https://nra.org/' },
    ],
    legal: [
      { name: 'Terms of service', href: '/terms' },
      { name: 'Privacy policy', href: '/privacy' },
    ],
  }
  

  export default function Footer() {
    return (
       <footer className="mt-32 bg-gray-900 sm:mt-56">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <Image
            alt="Maywood Sportsmen's Club"
            src="/logo.png"
            className="h-9"
            width={36}
            height={36}
          />
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm/6 font-semibold text-white">Useful Links</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.useful.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm/6 text-gray-400 hover:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm/6 font-semibold text-white">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.legal.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm/6 text-gray-400 hover:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    )
  }