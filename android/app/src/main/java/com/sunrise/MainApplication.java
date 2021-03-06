package com.sunrise;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.cmcewen.blurview.BlurViewPackage;
import com.beefe.picker.PickerViewPackage;
import com.corbt.keepawake.KCKeepAwakePackage;
import org.capslock.RNDeviceBrightness.RNDeviceBrightness;
import com.zmxv.RNSound.RNSoundPackage;
import com.calendarevents.CalendarEventsPackage;
import com.wix.interactable.Interactable;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new BlurViewPackage(),
            new PickerViewPackage(),
            new KCKeepAwakePackage(),
            new RNDeviceBrightness(),
            new RNSoundPackage(),
            new CalendarEventsPackage(),
            new Interactable()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
