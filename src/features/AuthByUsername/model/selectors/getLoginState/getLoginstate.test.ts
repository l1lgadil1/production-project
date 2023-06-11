import {DeepPartial} from "@reduxjs/toolkit";
import {StateSchema} from "app/providers/StoreProvider";
import {getLoginState} from "features/AuthByUsername/model/selectors/getLoginState/getLoginState";

describe('getLoginstate', () => {
    test('should return object', () => {
      const state:DeepPartial<StateSchema> = {
          loginForm:{
              username:'admin'
          }
      }
      expect(getLoginState(state as StateSchema)).toEqual({username:'admin'})
    })
})
