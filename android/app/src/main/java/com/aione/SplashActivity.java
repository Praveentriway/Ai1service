package com.aione;
import android.content.Intent;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.rnfs.RNFSPackage; 
import androidx.appcompat.app.AppCompatActivity;
public class SplashActivity extends AppCompatActivity{

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected void onCreate(Bundle savedInstanceState){
    super.onCreate(savedInstanceState);
    Intent intent = new Intent(this,MainActivity.class);
    startActivity(intent);
    finish();
  }
   
 
}
