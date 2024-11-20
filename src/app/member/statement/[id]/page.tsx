'use client'
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import CheckoutForm from './../CheckoutForm';
export default function Example() {
    const options = {
        mode: 'payment',
        amount: 1099,
        currency: 'usd',
        appearance: {/*...*/},
      };




const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  return (
    <form>
      <div className="bg-white space-y-12 sm:space-y-16">
       
        <div className='px-10 py-10'>
          <h2 className="text-base/7 font-semibold text-gray-900">Annual Dues</h2>
          <p className="mt-1 text-2-xl text-gray-600">
            The charge for <strong>$450</strong> is already added. Please review optional items below, when ready checkout.
          </p>


          <div className="mt-10 space-y-10 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <fieldset>
              <legend className="sr-only">By Email</legend>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:py-6">
                <div aria-hidden="true" className="text-sm/6 font-semibold text-gray-900">
                  Optional Items
                </div>
                <div className="mt-4 sm:col-span-2 sm:mt-0">
                  <div className="max-w-lg space-y-6">
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="comments"
                          name="comments"
                          type="checkbox"
                          className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm/6">
                        <label htmlFor="comments" className="font-medium text-gray-900">
                          Archery
                        </label>
                        <p className="mt-1 text-gray-600">Get notified when someones posts a comment on a posting.</p>
                      </div>
                    </div>
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="candidates"
                          name="candidates"
                          type="checkbox"
                          className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm/6">
                        <label htmlFor="candidates" className="font-medium text-gray-900">
                          Candidates
                        </label>
                        <p className="mt-1 text-gray-600">Get notified when a candidate applies for a job.</p>
                      </div>
                    </div>
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="offers"
                          name="offers"
                          type="checkbox"
                          className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm/6">
                        <label htmlFor="offers" className="font-medium text-gray-900">
                          Offers
                        </label>
                        <p className="mt-1 text-gray-600">Get notified when a candidate accepts or rejects an offer.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend className="sr-only">By Email</legend>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:py-6">
                <div aria-hidden="true" className="text-sm/6 font-semibold text-gray-900">
                  Donation Options
                </div>
                <div className="mt-4 sm:col-span-2 sm:mt-0">
                  <div className="max-w-lg space-y-6">
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="comments"
                          name="comments"
                          type="checkbox"
                          className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm/6">
                        <label htmlFor="comments" className="font-medium text-gray-900">
                          Archery
                        </label>
                        <p className="mt-1 text-gray-600">Get notified when someones posts a comment on a posting.</p>
                      </div>
                    </div>
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="candidates"
                          name="candidates"
                          type="checkbox"
                          className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm/6">
                        <label htmlFor="candidates" className="font-medium text-gray-900">
                          Candidates
                        </label>
                        <p className="mt-1 text-gray-600">Get notified when a candidate applies for a job.</p>
                      </div>
                    </div>
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="offers"
                          name="offers"
                          type="checkbox"
                          className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm/6">
                        <label htmlFor="offers" className="font-medium text-gray-900">
                          Offers
                        </label>
                        <p className="mt-1 text-gray-600">Get notified when a candidate accepts or rejects an offer.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend className="sr-only">Push Notifications</legend>
              <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
                <div aria-hidden="true" className="text-sm/6 font-semibold text-gray-900">
                  Deliery
                </div>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <div className="max-w-lg">
                    <p className="text-sm/6 text-gray-600">How do you want your badge delivered. If you select trap, you will get a notice when it is ready for pickup. Any extra items like window stickers or fobs will be sent seperatley.</p>
                    <div className="mt-6 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          id="push-everything"
                          name="push-notifications"
                          type="radio"
                          className="size-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label htmlFor="push-everything" className="block text-sm/6 font-medium text-gray-900">
                          Please mail my new badge
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="push-email"
                          name="push-notifications"
                          type="radio"
                          className="size-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label htmlFor="push-email" className="block text-sm/6 font-medium text-gray-900">
                          I will pick up at trap
                        </label>
                      </div>
                    
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <div className='px-4 py-4'>
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
        </div>
      </div>

    
    </form>
  )
}
